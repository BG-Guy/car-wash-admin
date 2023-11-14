import { formatter } from "@/lib/utils";
import { ServiceClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { ServiceColumn } from "./components/column";

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
