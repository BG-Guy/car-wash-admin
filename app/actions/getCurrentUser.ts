import { getServerSession } from "next-auth/next";

import prismadb from "@/lib/prismadb";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
      role:
        currentUser.id === "7233d696-3c8a-415b-9b35-8e8ef1ad9fad"
          ? "admin"
          : "user",
    };
  } catch (error: any) {
    console.log(error, "error 2222");
    null;
  }
}
