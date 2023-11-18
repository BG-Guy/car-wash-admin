"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import EditableCell from "./editable-cell";
import { Separator } from "@/components/ui/separator";

export type ServiceColumn = {
  id: string;
  name: string;
  price: string;
  description: string;
};

// THIS IS WHERE I STOPPED CODING. THE CELL FIELD IS THE CELL ITSELF. IF THERE ISNT A CELL FIELD THE COMPONENT CREATES ONE.
// SO I THINK I NEED TO CREATE A CELL TD WITH EDITABLE CONENT, A CUSTOM ONE. GOOD NIGHT! HEHE

export const columns: ColumnDef<ServiceColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row, column, table }) => (
      <EditableCell
        getValue={getValue}
        row={row}
        column={column}
        table={table}
        isDescription={false}
      />
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue, row, column, table }) => (
      <EditableCell
        getValue={getValue}
        row={row}
        column={column}
        table={table}
        isDescription={false}
      />
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue, row, column, table }) => (
      <EditableCell
        getValue={getValue}
        row={row}
        column={column}
        table={table}
        isDescription={true}
      />
    ),
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
