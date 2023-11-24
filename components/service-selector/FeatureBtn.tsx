"use client";
import useCart from "@/hooks/use-cart";
import { Service } from "@prisma/client";
import { MouseEventHandler, useState } from "react";

interface ServiceBtnProps {
  serviceData: Service;
}

const ServiceBtn: React.FC<ServiceBtnProps> = ({ serviceData }) => {
  const [isActive, setIsActive] = useState(false);
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(serviceData);
  };

  return (
    <button
      onClick={onAddToCart}
      className={`btn-primary ${isActive ? "bg-slate-500" : "bg-sky-950"}`}
    >
      {serviceData.name}
    </button>
  );
};

export default ServiceBtn;
