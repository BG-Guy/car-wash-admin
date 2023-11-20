import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import Greeting from "@/components/greeting";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <div>
      <Greeting user={session?.user} />
    </div>
  );
}
