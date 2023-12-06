"use client";
import React from "react";
import { OrderCard } from "./order-card";
import { FormattedOrder } from "@/app/types";
import { cn } from "@/lib/utils";

interface OrdersListProps {
  orders?: FormattedOrder[];
  className?: string;
}

export const OrdersList: React.FC<OrdersListProps> = async ({
  orders,
  className,
}) => {
  return (
    orders && (
      <div className={cn("p-2 overflow-y-scroll transition-all", className)}>
        {orders.map((formattedOrder) => (
          <OrderCard
            order={formattedOrder}
            className="md:w-[48%] mx-auto sm:mx-0 max-w-[400px] w-full flex"
            key={formattedOrder.id}
          />
        ))}
        {/* <button onClick={() => test()}>TEST</button> */}
      </div>
    )
  );
};
