"use client";
import { User } from "next-auth";
import Link from "next/link";
import UserMenu from "./user-menu";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import useRentModal from "@/hooks/useRentModal";
import { SafeUser } from "@/app/types";

type Props = {
  user: SafeUser | null | undefined;
  pagetype: string;
};

export default function UserButton({ user }: Props) {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!user) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, user]);
  return (
    <>
      {user ? (
        <UserMenu user={user} />
      ) : (
        <div className="space-x-4 flex flex-row">
          <button
            className="hover:underline cursor-pointer"
            onClick={loginModal.onOpen}
          >
            Login
          </button>
          <button
            className="hover:underline cursor-pointer"
            onClick={registerModal.onOpen}
          >
            Register
          </button>
        </div>
      )}
    </>
  );
}
