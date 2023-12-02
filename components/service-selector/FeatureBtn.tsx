"use client";
import { ServiceColumn } from "@/app/(root)/services/components/column";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler, useState } from "react";

interface ServiceBtnProps {
  serviceData: ServiceColumn;
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
