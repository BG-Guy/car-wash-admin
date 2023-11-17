"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import EditableCell from "./editable-cell";

export type AutomobileColumn = {
  id: string;
  type: string;
  price: string;
  description: string;
};

export const columns: ColumnDef<AutomobileColumn>[] = [
  {
    accessorKey: "type",
    header: "Type",
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
