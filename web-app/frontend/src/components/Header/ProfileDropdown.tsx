import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
interface ProfileDropdownProps {
  className?: string;
}
export function ProfileDropdown({ className = "" }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className="flex items-center text-sm rounded-full focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open user menu</span>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
            <span className="font-semibold">AN</span>
          </div>
          <div className="ml-2 text-left hidden sm:block">
            <div className="text-sm font-medium text-gray-700">
              Affiliated Networks
            </div>
          </div>
          <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
        </div>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="mr-2 h-4 w-4" />
              Your Profile
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
            <a
              href="#signout"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
