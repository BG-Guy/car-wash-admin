import { User } from "@prisma/client";

export async function formatUser(user: User) {
  const formattedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
