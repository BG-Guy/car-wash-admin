import { cn } from "@/lib/utils";

interface OrdersDataProps {
  className?: string;
}

const OrdersData: React.FC<OrdersDataProps> = ({ className }) => {
  return <div className={cn("rounded-xl", className)}>ORDERS DATA</div>;
};

export default OrdersData;
