import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "max-w-[1720px] mx-auto px-2 xl:pr-20 xl:pl-20 md:pr-10 md:pl-10 sm:pr-2 sm:px-1 w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
