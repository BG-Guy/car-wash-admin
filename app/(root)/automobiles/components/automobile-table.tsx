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
import { AutomobileColumn } from "@/app/(root)/automobiles/components/column";
import { AlertModal } from "@/components/modals/alert-modal";

interface AutomobileTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
}

export function AutomobileTable<TData, TValue>({
  columns,
  initialData,
}: AutomobileTableProps<TData, TValue>) {
  const [changedAutomobile, setChangedAutomobiles] = useState<
    AutomobileColumn[]
  >([]);
  const router = useRouter();

  const [data, setData] = useState(initialData);

  const updateOrAddItem = (item: AutomobileColumn) => {
    // If there isn't any item in the array, add the item
    if (changedAutomobile.length === 0) {
      setChangedAutomobiles((prevService) => {
        return [...prevService, item];
      });
      return;
    }

    if (changedAutomobile.some((automobile) => automobile.id === item.id)) {
      setChangedAutomobiles((prevServices) => {
        // Replacing the existing item
        return prevServices.map((automobile) =>
          automobile.id === item.id ? item : automobile
        );
      });
    } else {
      setChangedAutomobiles((prevServices) => {
        // Add the new item
        return [...prevServices, item];
      });
    }
  };

  const onSave = async () => {
    try {
      const updatePromises = changedAutomobile.map(async (item) => {
        const formattedItem = {
          ...item,
          price: parseFloat(item.price.replace("$", "")),
        };
        await axios.patch(
          `/api/automobiles/${formattedItem.id}`,
          formattedItem
        );
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
