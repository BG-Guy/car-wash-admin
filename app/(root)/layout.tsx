import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";

import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import Container from "@/components/Container";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
}
