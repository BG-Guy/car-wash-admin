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
import { signOut } from "next-auth/react";

interface Props {
  user: SafeUser;
}

export default function UserMenu({ user }: Props) {
  const userInitials = `${user.name?.split("")[0]}${user.name?.split("")[1]}`;
  const isAdmin = user.role === "admin";
  const getUserProfileHref = () => {
    return isAdmin ? "/admin/user-profile" : "/user-profile";
  };
  return (
    <div className="flex items-center justify-center cursor-pointer h-9 w-9 mx-4 rounded-full bg-slate-400 text-orange">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {user.image ? (
            <Image
              className="rounded-full"
              src={user.image}
              width={36}
              height={36}
              alt={user.image ?? "Profile Pic"}
              priority={true}
            />
          ) : (
            <span className="text-xl font-bold uppercase">{userInitials}</span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem>
            <button onClick={() => signOut()}>SIGN OUT</button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={getUserProfileHref()}>User Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
