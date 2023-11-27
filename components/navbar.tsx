import { MainNav } from "@/components/main-nav";
import { getServerSession } from "next-auth/next";

import Logo from "./Logo";
import Container from "./container";
import UserButton from "./user-button";
import getCurrentUser from "@/app/actions/getCurrentUser";

const Navbar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="border-b mb-2 py-1">
      <Container>
        <div className="flex h-16 items-center gap-4">
          <Logo />
          <MainNav user={currentUser} />
          <UserButton pagetype="server" user={currentUser} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
