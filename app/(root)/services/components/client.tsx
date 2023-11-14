import { Heading } from "@/components/ui/heading";
import { ServiceColumn, columns } from "./column";
import { ServiceForm } from "./service-form";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface ServiceClientProps {
  data: ServiceColumn[];
}

export const ServiceClient: React.FC<ServiceClientProps> = ({ data }) => {
  return (
    <div className="flex flex-col rounded-xl h-full w-full border-black border">
      <Heading
        title={`Services`}
        description="Manage services for your store"
      />
      <ServiceForm initialData={data} />
      <Separator />
      <DataTable columns={columns} data={data} />
    </div>
  );
};
