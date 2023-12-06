"use client";
import { getUserById } from "@/app/actions/getActions";
import { FormattedOrder } from "@/app/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";

interface OrderCardProps {
  order?: FormattedOrder;
  className?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, className }) => {
  console.log("🚀 ~ file: order-card.tsx:16 ~ order:", order);
  const [moreInfoToggle, setMoreInfoToggle] = useState(false);
  const handleSetMoreInfo = () => {
    console.log(
      "🚀 ~ file: order-card.tsx:22 ~ handleSetMoreInfo ~ handleSetMoreInfo:",
      handleSetMoreInfo
    );

    setMoreInfoToggle(!moreInfoToggle);
  };

  const extendedCard = () => {
    return (
      <div className="flex">
        <div className="header">
          <h1>Order By: ${order?.user.name}</h1>
          <h3>Email: ${order?.user.email}</h3>
        </div>
        <div className="info">
          <h3>${order?.createdAt}</h3>
          <textarea name="" id="" cols={30} rows={10}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam
            alias voluptatum soluta illo itaque recusandae sint qui nisi quia
            facilis.
          </textarea>
        </div>
      </div>
    );
  };

  const test = () => {
    const string = extendedCard();
  };

  const cardSize = () => {
    return moreInfoToggle ? "row-span-4" : "aspect-[16/6]";
  };

  return (
    order && (
      <>
        <div
          className={cn(
            ` min-w-[300px] row-span-2 transition-transform border border-black rounded-xl mt-2`,
            className,
            cardSize()
          )}
        >
          <div className="order-items flex flex-col w-[70%]">
            <h3 className="text-2xl font-semibold mx-auto mb-2">
              {order.automobile.type}
            </h3>
            <div className="features flex gap-2 w-full flex-wrap">
              {order.services.map((service: any) => (
                <span key={service.id} className="text-lg w-[45%] text-center">
                  {service.name}
                </span>
              ))}
            </div>
          </div>
          <div className="order-actions grid2x2-layout w-[30%]">
            <span className="col-start-1 col-end-2">
              <BiCheckCircle size={50} />
            </span>
            <span className="col-start-2 col-end-3">
              <MdOutlineCancel size={50} />
            </span>
            <div className="row-start-2 col-start-1 col-end-3 w-full ">
              <button
                onClick={() => handleSetMoreInfo()}
                className="w-full p-1 h-12 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90"
              >
                More Info
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};
