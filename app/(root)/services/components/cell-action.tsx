import { Edit, Trash } from "lucide-react";
import { ServiceColumn } from "./column";
import axios from "axios";
import toast from "react-hot-toast";

interface CellActionProps {
  data: ServiceColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onDelete = async () => {
    console.log("🚀 ~ file: cell-action.tsx:13 ~ onDelete ~ data.id:", data.id);
    try {
      await axios.delete(`/api/services/${data.id}`);
      toast.success("success baby you will get it");
    } catch {
      toast.error(
        "Make sure you removed all products using this category first."
      );
    }
  };

  return (
    <div className="flex h-full ml-auto space-x-2">
      <Edit />
      <Trash onClick={() => onDelete()} />
    </div>
  );
};
