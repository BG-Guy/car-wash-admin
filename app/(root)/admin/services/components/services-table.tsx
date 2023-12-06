"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FormattedService } from "@/app/types";

interface ServiceTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
}

export function ServiceTable<TData, TValue>({
  columns,
  initialData,
}: ServiceTableProps<TData, TValue>) {
  const [changedServices, setChangedServices] = useState<FormattedService[]>(
    []
  );
  const router = useRouter();

  const [data, setData] = useState(initialData);

  const updateOrAddItem = (item: FormattedService) => {
    // If there isn't any item in the array, add the item
    if (changedServices.length === 0) {
      setChangedServices((prevService) => {
        return [...prevService, item];
      });
      return;
    }

    if (changedServices.some((automobile) => automobile.id === item.id)) {
      setChangedServices((prevServices) => {
        // Replacing the existing item
        return prevServices.map((automobile) =>
          automobile.id === item.id ? item : automobile
        );
      });
    } else {
      setChangedServices((prevServices) => {
        // Add the new item
        return [...prevServices, item];
      });
    }
  };

  const onSave = async () => {
    try {
      const updatePromises = changedServices.map(async (item) => {
        const formattedItem = {
          ...item,
          price: parseFloat(item.price.replace("$", "")),
        };
        await axios.patch(`/api/services/${formattedItem.id}`, formattedItem);
      });

      // Wait for all promises to settle
      await Promise.all(updatePromises);
      router.refresh();
      toast.success("success baby you will get it");
      window.location.reload();
    } catch (error: any) {
      toast.error("something went wrong");
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {},
    meta: {
      updateData: (row: any, columnId: any, value: any) =>
        setData((old) =>
          old.map((_row, index) => {
            if (index === row.index) {
              updateOrAddItem({ ...row.original, [columnId]: value });

              return {
                ..._row,
                [columnId]: value,
              };
            }
            return _row;
          })
        ),
    },
  });

  return (
    <div>
      <div className="mb-2 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Button onClick={() => onSave()} size={"lg"} variant="default">
        SAVE
      </Button>
    </div>
  );
}
