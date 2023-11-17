import { checkIsAdmin, formatter } from "@/lib/utils";
import { ServiceClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { ServiceColumn } from "./components/column";
import { useSession } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServicesPage = async () => {
  const services = await prismadb.service.findMany();

  const formattedServices: ServiceColumn[] = services.map((service) => ({
    id: service.id,
    name: service.name,
    price: formatter.format(service.price.toNumber()),
    description: service.description,
  }));

  return (
    <div>
      <ServiceClient data={formattedServices} />
    </div>
  );
};

export default ServicesPage;
