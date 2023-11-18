import { Heading } from "@/components/ui/heading";
import { AutomobileColumn, columns } from "./column";
import { AutomobileForm } from "./automobile-form";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { AutomobileTable } from "./automobile-table";

interface AutomobileClientProps {
  data: AutomobileColumn[];
}

export const AutomobileClient: React.FC<AutomobileClientProps> = ({ data }) => {
  return (
    <div className="flex flex-col rounded-xl h-full w-full">
      <Heading
        title={`Automobiles`}
        description="Manage services for your store"
      />
      <Separator orientation="horizontal" className="my-4" />
      <AutomobileForm initialData={data} />
      <Separator orientation="vertical" className="mb-4" />
      {/* <DataTable columns={columns} initialData={data} /> */}
      <AutomobileTable columns={columns} initialData={data} />
    </div>
  );
};
