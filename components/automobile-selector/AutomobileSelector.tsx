import { Automobile } from "@prisma/client";
import AutomobileBtn from "./AutomobileBtn";
import { AutomobileColumn } from "@/app/(root)/automobiles/components/column";

interface AutomobileSelectorProps {
  className?: string;
  formattedAutomobiles: AutomobileColumn[];
}

const AutomobileSelector: React.FC<AutomobileSelectorProps> = ({
  className,
  formattedAutomobiles,
}) => {
  return (
    <div className="w-full h-1/2">
      <div className="grid2x2-layout">
        {formattedAutomobiles.map((automobileData) => (
          <AutomobileBtn automobileData={automobileData} />
        ))}
      </div>
    </div>
  );
};

export default AutomobileSelector;
