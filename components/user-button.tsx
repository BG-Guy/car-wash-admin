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
  user: SafeUser | null;
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
  console.log("🚀 ~ file: user-button.tsx:20 ~ UserButton ~ user:", user);

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
        <div>
          <button onClick={loginModal.onOpen}>Login</button>
          <button onClick={() => signOut()}>LOGOUT</button>
        </div>
      )}
    </>
  );
}
