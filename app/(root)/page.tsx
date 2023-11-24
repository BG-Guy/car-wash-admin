import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Greeting from "@/components/greeting";
import Dashboard from "@/components/dashboard/Dashboard";
import { redirect } from "next/navigation";
import axios from "axios";

export default async function Home() {
  const session = await getServerSession(options);
  if (session?.user.user?.email) {
    const user = await axios.get(`/api/user`, session?.user.user?.email);

    console.log("🚀 ~ file: page.tsx:13 ~ Home ~ user:", user);
  }

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <div>
      <Dashboard user={session?.user} />
      <Greeting user={session?.user} pagetype="server" />
    </div>
  );
}
