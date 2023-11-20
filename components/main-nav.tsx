"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathname === `/`,
    },
    {
      href: `/api/auth/signin`,
      label: "sign-in",
      active: pathname === `/api/auth/signin`,
    },
    {
      href: `/api/auth/signout`,
      label: "sign-out",
      active: pathname === `/api/auth/signout`,
    },
    {
      href: `/admin/services`,
      label: "Services",
      active: pathname === `/admin/services`,
    },
    {
      href: `/admin/automobiles`,
      label: "Automobiles",
      active: pathname === `/admin/automobiles`,
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
      {routes.map((route) => (
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
