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
            className={`block px-4 py-2 text-base font-bold transform rotate-[0.2deg] transition-all duration-300 hover:rotate-[-0.1deg] ${
              item.current
                ? "text-black border-l-4 border-[#CC2936] pl-3 bg-[#F18F01]/10"
                : "text-[#6B6B6B] hover:bg-black/5 hover:text-black"
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
          className={`relative inline-flex items-center px-1 pt-1 text-sm font-bold transform transition-all duration-300 hover:rotate-[-0.2deg] ${
            item.current
              ? "text-black rotate-[0.3deg]"
              : "text-[#6B6B6B] hover:text-black rotate-[0.1deg]"
          }`}
        >
          {item.name}
          {item.current && (
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#CC2936] transform rotate-[0.8deg] rounded-full"></span>
          )}
        </Link>
      ))}
    </nav>
  );
}
