import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type FormattedAutomobile = {
  id: string;
  type: string;
  price: string;
  description: string;
};

export type FormattedService = {
  id: string;
  name: string;
  price: string;
  description: string;
};

export type FormattedOrder = {
  id: string;
  createdAt: string;
  user: User;
  automobile: FormattedAutomobile;
  services: FormattedService[];
};

export type formattedUser = {
  id: string;
  name: string;
  email: string;
};
