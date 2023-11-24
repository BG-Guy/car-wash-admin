import { User } from "next-auth";
import Link from "next/link";
import UserMenu from "./user-menu";

type Props = {
  user: User;
  pagetype: string;
};

export default async function UserButton({ user }: Props) {
  return (
    <>
      {user ? (
        <UserMenu user={user} />
      ) : (
        <Link className="font-medium text-sm" href={"api/auth/signin"}>
          Login
        </Link>
      )}
    </>
  );
}
