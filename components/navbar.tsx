import { MainNav } from "@/components/main-nav";
import Logo from "./Logo";
import Container from "./container";

const Navbar = async () => {
  return (
    <div className="border-b mb-2 py-1">
      <Container>
        <div className="flex h-16 items-center">
          <Logo />
          <MainNav />
          <div className="ml-4 flex items-center ">
            {/* <UserButton afterSignOutUrl="/" /> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
