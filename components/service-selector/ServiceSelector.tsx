import { cn } from "@/lib/utils";
// import Button from "../button";
import { Service } from "@prisma/client";
import FeatureBtn from "./FeatureBtn";
import { FormattedService } from "@/app/types";

interface ServiceSelectorProps {
  className?: string;
  formattedServices: FormattedService[];
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  className,
  formattedServices,
}) => {
  return (
    <div className={cn("grid2x2-layout", className)}>
      {formattedServices.map((serviceData) => (
        <FeatureBtn serviceData={serviceData} />
      ))}
    </div>
  );
};

export default ServiceSelector;
