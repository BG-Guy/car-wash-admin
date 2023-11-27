import Image from "next/image";
import { User } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SafeUser } from "@/app/types";

interface Props {
  user: SafeUser;
}

export default function UserMenu({ user }: Props) {
  const userImg = user;

  return (
    <div className="flex items-center justify-center cursor-pointer h-9 w-9 mx-4 rounded-full bg-slate-400 text-orange">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {userImg ? (
            <Image
              className="rounded-full"
              src={userImg}
              width={36}
              height={36}
              alt={userImg ?? "Profile Pic"}
              priority={true}
            />
          ) : (
            <span className="text-xl font-bold uppercase">{userImg}</span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem>
            <Link href={"/api/auth/signout"}>Signout</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={""}>User Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
