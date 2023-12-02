"use client";
import { cn } from "@/lib/utils";
import { OrderItem, Order } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import useCart from "@/hooks/use-cart";

interface SubmitBtnProps {
  data: OrderItem[];
  className: string;
}

const SubmitBtn: React.FC<SubmitBtnProps> = ({ data, className }) => {
  const isValid = () => {
    return data.some((item) => item.type);
  };
  const cart = useCart();

  const onResetCart = () => {
    cart.removeAll();
  };

  const [loading, setLoading] = useState(false);

  const orderItemIds = data.map((orderItem) => {
    return orderItem.id;
  });
  console.log(
    "🚀 ~ file: SubmitBtn.tsx:19 ~ orderItemIds ~ orderItemIds:",
    data
  );

  const onSubmit = async () => {
    if (!isValid) return console.log("VEHICLE IS MISSING");

    try {
      setLoading(true);
      await axios.post(`/api/order`, data);

      toast.success("success baby you will get it");
    } catch {
      toast.error("Something went wrong");
    } finally {
      onResetCart();
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="w-48 m-auto"
        variant={"destructive"}
        size={"lg"}
        disabled={!isValid() || loading}
        onClick={onSubmit}
      >
        SUBMIT
      </Button>
    </>
  );
};

export default SubmitBtn;
