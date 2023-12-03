"use client";
import { AutomobileColumn } from "@/app/(root)/automobiles/components/column";
import { ServiceColumn } from "@/app/(root)/services/components/column";
import React from "react";

interface OrderItemProps {
  order: {
    id: string;
    userId: string;
    automobile: any;
    services: ServiceColumn[];
  };
}

export const OrderCard: React.FC<OrderItemProps> = ({ order }) => {
  console.log("🚀 ~ file: order-card.tsx:16 ~ order:", order);
  return (
    order && (
      <>
        <div className="flex w-full aspect-video">
          <div className="order-items flex flex-col">
            <h3>{order.automobile[0].type}</h3>
            <div className="features flex flex-wrap">
              {order.services.map((service: any) => (
                <span key={service.id} className="feature">
                  {service.name}
                </span>
              ))}
            </div>
          </div>
          <div className="order-actions grid2x2-layout">
            <span className="col-start-1 col-end-2">CHECK</span>
            <span className="col-start-2 col-end-3">CANCEL</span>
            <button
              onClick={() => console.log(order, "order")}
              className="row-start-2"
            >
              More Info
            </button>
          </div>
        </div>
      </>
    )
  );
};
