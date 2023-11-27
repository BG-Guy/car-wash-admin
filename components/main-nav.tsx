"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { SafeUser } from "@/app/types";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  // Add the user prop to the MainNavProps
  user: SafeUser | null;
}

export function MainNav({ className, user, ...props }: MainNavProps) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathname === `/`,
      role: "any",
    },

    {
      href: `/admin/services`,
      label: "Services",
      active: pathname === `/admin/services`,
      role: "admin",
    },
    {
      href: `/admin/automobiles`,
      label: "Automobiles",
      active: pathname === `/admin/automobiles`,
      role: "admin",
    },
  ];

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 ml-auto lg:space-x-6",
        className
      )}
      {...props}
    >
      {routes
        .filter((route) =>
          route.role === "admin" ? user?.role === "admin" : true
        )
        .map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
    </nav>
  );
}
