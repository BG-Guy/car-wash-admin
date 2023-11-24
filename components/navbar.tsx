import { MainNav } from "@/components/main-nav";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

import Logo from "./Logo";
import Container from "./container";
import UserButton from "./user-button";

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <div className="border-b mb-2 py-1">
      <Container>
        <div className="flex h-16 items-center gap-4">
          <Logo />
          <MainNav />
          <UserButton user={session?.user} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
