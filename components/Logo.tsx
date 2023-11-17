"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      className="logo-wrapper flex items-center 
      md:space-x-4"
    >
      <Image
        onClick={() => router.push("/")}
        alt="Logo"
        className="hidden bg-slate-300 justify-self-start md:block cursor-pointer left-0 relative rounded-3xl"
        height="50"
        width="50"
        src={"/images/logo.png"}
      />
      <div className="text-center m-0 w-48 flex text-3xl font-title">
        Car Wash
      </div>
    </div>
  );
};

export default Logo;
