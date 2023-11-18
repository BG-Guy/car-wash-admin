import { checkUserRole } from "@/lib/utils";
import { useClientFunctions } from "@/providers/admin-provider";
import { auth, useSession } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function AdminPage() {
  // if (userRole !== "admin") redirect("/");

  return <div>admin page</div>;
}
