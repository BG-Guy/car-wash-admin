import { cn, formatter } from "@/lib/utils";
import Header from "../dashboard/Header";
import prismadb from "@/lib/prismadb";
import AutomobileSelector from "../automobile-selector/AutomobileSelector";
import ServiceSelector from "../service-selector/ServiceSelector";
import { AutomobileColumn } from "@/app/(root)/automobiles/components/column";
import { FormattedService } from "@/app/types";

interface OrderControllerProps {
  className?: string;
}

const OrderController: React.FC<OrderControllerProps> = async ({
  className,
}) => {
  const services = await prismadb.service.findMany();
  const formattedServices: FormattedService[] = services.map((service) => ({
    id: service.id,
    name: service.name,
    price: formatter.format(service.price.toNumber()),
    description: service.description,
  }));
  const automobiles = await prismadb.automobile.findMany();
  const formattedAutomobiles: AutomobileColumn[] = automobiles.map(
    (automobile) => ({
      id: automobile.id,
      type: automobile.type,
      price: formatter.format(automobile.price.toNumber()),
      description: automobile.description,
    })
  );

  return (
    <div
      className={cn("rounded-xl p-4 border-gray-200 border-[1px] ", className)}
    >
      <Header message={"Order Controller"} type={"sub"} align="center" />
      <AutomobileSelector formattedAutomobiles={formattedAutomobiles} />
      <ServiceSelector formattedServices={formattedServices} />
    </div>
  );
};

export default OrderController;
