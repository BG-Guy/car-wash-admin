import { formatter } from "@/lib/utils";
import { ServiceClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { FormattedService } from "@/app/types";

const ServicesPage = async () => {
  const services = await prismadb.service.findMany();

  const formattedServices: FormattedService[] = services.map((service) => ({
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
