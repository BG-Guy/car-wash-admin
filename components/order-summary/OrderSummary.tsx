"use client";
import { cn } from "@/lib/utils";
import { MinusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "../dashboard/Header";
import SubmitBtn from "./SubmitBtn";
import useCart from "@/hooks/use-cart";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface OrderSummaryProps {
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ className }) => {
  const cart = useCart();
  const data = useCart((state) => state.items);
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/api/auth/signin?callbackUrl=/client");
  //   },
  // });
  // const loggedUser = loggedInUser();
  const order = {
    data,
  };
  const onRemove = (id: string) => {
    cart.removeItem(id);
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const getSelectedVehicle = () => {
    return data
      .filter((item) => item.type)
      .map((item) => (
        <div className="py-1">
          <button
            key={item.id}
            className="cart-btn h-16 w-40 flex items-center"
          >
            <MinusIcon
              color="black"
              onClick={() => onRemove(item.id)}
              className="rounded-3xl transition hover:bg-red-600 mr-3 border-[2px] border-gray-950"
            />
            {item.type}
          </button>
        </div>
      ));
  };

  const getSelectedFeatures = () => {
    return data
      .filter((item) => item.name)
      .map((item) => (
        <div className="py-1">
          <button key={item.id} className="cart-btn">
            <MinusIcon
              color="black"
              onClick={() => onRemove(item.id)}
              className="rounded-3xl transition hover:bg-red-600 mr-3 border-[2px] border-gray-950"
            />
            {item.name}
          </button>
        </div>
      ));
  };

  return (
    <div
      className={cn(
        "p-4 grid grid-rows-6 rounded-xl border-[1px] border-gray-200",
        className
      )}
    >
      <Header
        className="row-span-1"
        message={"Cart Summary"}
        type={"sub"}
        align="center"
      />
      <div className="grid grid-cols-2 grid-rows-1 row-span-5  ">
        <div className="flex flex-col col-start-1 features">
          <Header message={"Features selected:"} type={"sm"} align="start" />
          <div className="flex flex-col">{getSelectedFeatures()}</div>
        </div>
        <div className="flex flex-col vehicles">
          <Header message={"Vehicle selected:"} type={"sm"} align="start" />
          {getSelectedVehicle()}
        </div>
      </div>
      <SubmitBtn className="w-1/2 m-auto p-1  " data={data} order={order} />
    </div>
  );
};

export default OrderSummary;
