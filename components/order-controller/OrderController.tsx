import { cn, formatter } from "@/lib/utils";
import FeatureSelector from "../service-selector/ServiceSelector";
import VehicleSelector from "../automobile-selector/AutomobileSelector";
import Header from "../dashboard/Header";
import prismadb from "@/lib/prismadb";
import { Service } from "@prisma/client";
import { ServiceColumn } from "@/app/(root)/services/components/column";
import AutomobileSelector from "../automobile-selector/AutomobileSelector";
import ServiceSelector from "../service-selector/ServiceSelector";

interface OrderControllerProps {
  className?: string;
}

const OrderController: React.FC<OrderControllerProps> = async ({
  className,
}) => {
  const services = await prismadb.service.findMany();
  const automobiles = await prismadb.automobile.findMany();

  return (
    <div
      className={cn("rounded-xl p-4 border-gray-200 border-[1px] ", className)}
    >
      <Header message={"Order Controller"} type={"sub"} align="center" />
      <AutomobileSelector automobiles={automobiles} />
      <ServiceSelector services={services} />
    </div>
  );
};

export default OrderController;
