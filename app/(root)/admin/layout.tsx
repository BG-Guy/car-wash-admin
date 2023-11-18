import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import Container from "@/components/Container";
import { createContext, useContext } from "react";
import { AdminFunctionProvider } from "@/providers/admin-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
