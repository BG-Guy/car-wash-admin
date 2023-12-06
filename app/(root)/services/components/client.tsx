import { Heading } from "@/components/ui/heading";
import { columns } from "./column";
import { ServiceForm } from "./service-form";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { ServiceTable } from "./services-table";
import { FormattedService } from "@/app/types";

interface ServiceClientProps {
  data: FormattedService[];
}

export const ServiceClient: React.FC<ServiceClientProps> = ({ data }) => {
  return (
    <div className="flex flex-col rounded-xl h-full w-full">
      <Heading
        title={`Services`}
        description="Manage services for your store"
      />
      <Separator orientation="horizontal" className="my-4" />
      <ServiceForm initialData={data} />
      <Separator orientation="vertical" className="mb-4" />
      {/* <DataTable columns={columns} initialData={data} /> */}
      <ServiceTable columns={columns} initialData={data} />
    </div>
  );
};
