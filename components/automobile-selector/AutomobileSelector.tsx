import { Automobile } from "@prisma/client";
import AutomobileBtn from "./AutomobileBtn";

interface AutomobileSelectorProps {
  className?: string;
  automobiles: Automobile[];
}

const AutomobileSelector: React.FC<AutomobileSelectorProps> = ({
  className,
  automobiles,
}) => {
  return (
    <div className="w-full h-1/2">
      <div className="grid2x2-layout">
        {automobiles.map((automobileData) => (
          <AutomobileBtn automobileData={automobileData} />
        ))}
      </div>
    </div>
  );
};

export default AutomobileSelector;
