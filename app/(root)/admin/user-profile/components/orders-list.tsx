import React from "react";
import { OrderCard } from "./order-card";
import { Order } from "@prisma/client";
import {
  getAutomobileByOrder,
  getOrderById,
  getServices,
} from "@/app/actions/getActions";
import prismadb from "@/lib/prismadb";

interface OrdersListProps {
  orders: any[];
}

export const OrdersList: React.FC<OrdersListProps> = async ({ orders }) => {
  return (
    orders && (
      <>
        <div>
          {orders.map((formattedOrder) => (
            <OrderCard order={formattedOrder} />
          ))}
        </div>
      </>
    )
  );
};
