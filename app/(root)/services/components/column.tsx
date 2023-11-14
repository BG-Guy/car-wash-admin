"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

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
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "description",
    header: "Description",
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
