import Greeting from "@/components/greeting";
import Dashboard from "@/components/dashboard/Dashboard";
import axios from "axios";
import getCurrentUser from "../actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    console.log("PLEASE LOGIN");
  }

  return currentUser ? (
    <div>
      <Dashboard user={currentUser} />
      <Greeting user={currentUser} pagetype="server" />
    </div>
  ) : (
    <div>PLEASE LOGIN</div>
  );
}
