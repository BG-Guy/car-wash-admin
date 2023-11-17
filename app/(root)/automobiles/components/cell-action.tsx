import { Edit, Trash } from "lucide-react";
import { AutomobileColumn } from "./column";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: AutomobileColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    console.log("🚀 ~ file: cell-action.tsx:13 ~ onDelete ~ data.id:", data.id);
    try {
      await axios.delete(`/api/automobiles/${data.id}`);
      toast.success("success baby you will get it");
      router.refresh();
      window.location.reload();
    } catch {
      toast.error(
        "Make sure you removed all products using this category first."
      );
    }
  };

  return (
    <div className="flex h-full ml-auto space-x-2">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Edit className="cursor-pointer" />
      <Trash className="cursor-pointer" onClick={() => onDelete()} />
    </div>
  );
};
