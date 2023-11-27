import { SafeUser } from "@/app/types";
import OrderController from "../order-controller/OrderController";
import OrderSummary from "../order-summary/OrderSummary";
import OrdersData from "../orders-data/OrderData";
import Header from "./Header";
import { cn } from "@/lib/utils";

interface DashboardProps {
  className?: string;
  user: SafeUser | null;
}

const Dashboard: React.FC<DashboardProps> = ({ className, user }) => {
  console.log("🚀 ~ file: Dashboard.tsx:15 ~ user:", user);
  return (
    <div
      className={cn(
        className,
        "border-[1px] p-2 gap-4 w-full min-h-[calc(100vh-82px)] grid grid-rows-5 sm:grid-cols-1 md:grid-cols-7"
      )}
    >
      <Header
        message={`Welcome Backk ${user?.name} ${user?.id}`}
        type="main"
        align="start"
        className="row-start-1 row-end-2 col-start-1 col-end-8"
      />
      <OrdersData className="shadow-md row-start-2 row-end-6 col-start-1 col-end-2" />
      <OrderController className="shadow-md row-start-2 row-end-6 col-start-2 col-end-5" />
      <OrderSummary className="shadow-md row-start-2 row-end-6 col-start-5 col-end-8" />
    </div>
  );
};

export default Dashboard;
