import { cn } from "@/lib/utils";
import { OrderItem, Order } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

interface SubmitBtnProps {
  data: OrderItem[];
  className: string;
}

const SubmitBtn: React.FC<SubmitBtnProps> = ({ data, className }) => {
  const isValid = () => {
    return data.some((item) => item.type);
  };

  const onSubmit = async () => {
    if (!isValid) return console.log("VEHICLE IS MISSING");

    try {
      await axios.post(`/api/order`, data);

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
