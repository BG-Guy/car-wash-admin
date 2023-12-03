import React from "react";
import { OrdersList } from "./components/orders-list";
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getOrderById } from "@/app/actions/getActions";

const userProfilePage = async () => {
  const user = await getCurrentUser();
  const userId = user?.id;
  const orders = await prismadb.order.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      orderItems: {
        include: {
          automobile: true,
          service: true,
        },
      },
    },
  });

  const formattedOrders = await Promise.all(
    orders.map(async (order) => {
      const formattedOrder = {
        userId: order?.userId,
        id: order?.id,
        automobile: order?.orderItems
          .map((item) => item.automobile)
          .filter((automobile) => automobile !== null),
        services: order?.orderItems
          .map((item) => item.service)
          .filter((service) => service !== null),
      };
      return formattedOrder;
    })
  );
  return (
    <div className="grid grid-cols-2">
      <OrdersList orders={formattedOrders} />
    </div>
  );
};

export default userProfilePage;
