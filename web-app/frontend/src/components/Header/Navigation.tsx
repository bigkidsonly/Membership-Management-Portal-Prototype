import React from "react";
import { Link, useLocation } from "react-router-dom";
interface NavigationProps {
  className?: string;
  isMobile?: boolean;
}
export function Navigation({
  className = "",
  isMobile = false,
}: NavigationProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      current: pathname === "/" || pathname === "/dashboard",
    },
    {
      name: "Affiliates",
      href: "/affiliates",
      current: pathname === "/affiliates",
    },
    {
      name: "Marketplace",
      href: "/marketplace",
      current: pathname.startsWith("/marketplace"),
    },
    {
      name: "Projects",
      href: "/projects",
      current: pathname === "/projects",
    },
    {
      name: "User Management",
      href: "/user-management",
      current: pathname === "/user-management",
    },
    {
      name: "Billing",
      href: "/billing",
      current: pathname === "/billing",
    },
    {
      name: "Directory",
      href: "/directory",
      current: pathname === "/directory",
    },
    {
      name: "Support",
      href: "/support",
      current: pathname === "/support",
    },
  ];
  if (isMobile) {
    return (
      <>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`block px-4 py-2 text-base font-medium ${
              item.current
                ? "text-primary border-l-4 border-primary pl-3 bg-primary/5"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </>
    );
  }
  return (
    <nav className={className}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
            item.current
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
