import React from "react";
import { OrdersList } from "./components/orders-list";
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getOrderById } from "@/app/actions/getActions";
import AdminStatistics from "./components/statistics";
import { format } from "date-fns";
import { wrapGrid } from "animate-css-grid";

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
        id: order?.id,
        createdAt: format(order.createdAt, "mm/dd/yyyy, h:mm:ss a"),
        user,
        automobile: order?.orderItems
          .map((item) => item.automobile)
          .find((automobile) => automobile !== null),
        services: order?.orderItems
          .map((item) => item.service)
          .filter((service) => service !== null),
      };
      return formattedOrder;
    })
  );

  return (
    <div
      className="sm:flex sm:w-full sm:justify-evenly sm:overflow-x-hidden 
                 overflow-x-scroll  min-w-full whitespace-nowrap"
    >
      <OrdersList
        orders={formattedOrders}
        className="sm:w-[50%] lg:w-[75%] sm:grid sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3
                   grid-rows-10 grid-flow-dense	 grid-container transition-row-span  w-screen max-h-screen inline-block gap-2"
      />
      <AdminStatistics
        className="sm:w-[50%] sm:flex sm:flex-col lg:w-[25%] 
                   w-screen inline-block  "
      />
    </div>
  );
};

export default userProfilePage;
