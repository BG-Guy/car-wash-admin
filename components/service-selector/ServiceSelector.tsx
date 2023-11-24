import { cn } from "@/lib/utils";
// import Button from "../button";
import { Service } from "@prisma/client";
import FeatureBtn from "./FeatureBtn";

interface ServiceSelectorProps {
  className?: string;
  services: Service[];
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  className,
  services,
}) => {
  return (
    <div className={cn("grid2x2-layout", className)}>
      {services.map((serviceData) => (
        <FeatureBtn serviceData={serviceData} />
      ))}
    </div>
  );
};

export default ServiceSelector;
