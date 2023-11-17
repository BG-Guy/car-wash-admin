import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import prismadb from "@/lib/prismadb";
import Container from "./Container";
import Logo from "./Logo";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="border-b mb-2 py-1">
      <Container>
        <div className="flex h-16 items-center">
          <Logo />
          <MainNav />
          <div className="ml-4 flex items-center ">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
