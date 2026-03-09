"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkComponentProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  end?: boolean;
}

const NavLink = ({
  to,
  children,
  className = "",
  activeClassName = "nav-link-active",
  end = false,
}: NavLinkComponentProps) => {
  const pathname = usePathname();

  const isActive = end
    ? pathname === to
    : pathname === to || (to !== "/" && pathname.startsWith(to));

  return (
    <Link
      href={to}
      className={cn(className, isActive ? activeClassName : "nav-link")}
    >
      {children}
    </Link>
  );
};

export default NavLink;
