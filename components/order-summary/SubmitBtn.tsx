import { cn } from "@/lib/utils";
import { OrderItem, Order } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { useEffect } from "react";

interface SubmitBtnProps {
  data: OrderItem[];
  // order: Order;
  className: string;
  user: User;
}

const SubmitBtn: React.FC<SubmitBtnProps> = ({ data, user, className }) => {
  // const session = await getServerSession(options);
  // const userId = session?.user.id;
  const isValid = () => {
    return data.some((item) => item.type);
  };

  // if (!session) {
  //   redirect("/api/auth/signin?callbackUrl=/server");
  // }

  const onSubmit = async () => {
    if (!isValid) return console.log("VEHICLE IS MISSING");
    console.log(
      "🚀 ~ file: SubmitBtn.tsx:25 ~ onSubmit ~ order.user:",
      user.id
    );
    const order = {
      data,
      user,
    };
    try {
      await axios.post(`/api/order`, order);
      console.log(order, "DATA");

      toast.success("success baby you will get it");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={cn(
        "w-28 h-12 py-2 px-4 grid place-items-center bg-red-500 text-white font-semibold rounded-lg shadow-md cursor-pointer",
        className
      )}
    >
      <button disabled={!isValid()} onClick={onSubmit}>
        SUBMIT
      </button>
    </div>
  );
};

export default SubmitBtn;
