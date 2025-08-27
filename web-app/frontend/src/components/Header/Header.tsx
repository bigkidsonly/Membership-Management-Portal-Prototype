import React, { useState } from "react";
import { Bell, Menu, MessageSquare, X } from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";
import { Navigation } from "./Navigation";
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-10 w-auto"
                src="https://uploadthingy.s3.us-west-1.amazonaws.com/3aBa5PGbG9Vrd8GLfpVgtE/TMC_Primary_Logo_1000x400_Web_Full_Color_Blue__Vivid_Orange_Transparent.png"
                alt="The Movement Cooperative"
              />
            </div>
            <Navigation className="hidden md:ml-6 md:flex md:space-x-8" />
          </div>
          <div className="flex items-center">
            <button className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded-md text-sm font-medium hidden md:block">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>Private Slack</span>
              </div>
            </button>
            <button className="ml-4 relative p-1 rounded-full text-gray-600 hover:text-primary">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
            </button>
            <ProfileDropdown className="ml-4" />
            <div className="flex md:hidden ml-4">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Navigation isMobile={true} />
            <button className="flex w-full items-center px-4 py-2 text-base font-medium text-primary hover:bg-gray-100">
              <MessageSquare className="h-5 w-5 mr-2" />
              Private Slack
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
