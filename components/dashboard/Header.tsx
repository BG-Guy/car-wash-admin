import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
  message: string;
  type: "sub" | "main" | "sm";
  align: "center" | "start" | "end";
}

const Header: React.FC<HeaderProps> = ({ className, message, type, align }) => {
  const headerTypes = {
    main: "text-3xl font-primary drop-shadow-md",
    sub: "text-2xl font-simple drop-shadow-md",
    sm: "text-xl font-simple drop-shadow-md",
  };

  const alignText = {
    start: "text-start",
    center: "text-center",
    end: "text-end",
  };
  const getAlign = alignText[align];
  const headerType = headerTypes[type];

  return (
    <div
      className={cn(
        "text-black rounded-xl mb-2",
        headerType,
        getAlign,
        className
      )}
    >
      {message}
    </div>
  );
};

export default Header;
