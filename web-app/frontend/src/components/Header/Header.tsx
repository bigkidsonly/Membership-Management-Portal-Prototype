import React, { useState } from "react";
import {
  Bell,
  Menu,
  MessageSquare,
  X,
  Calendar,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";
import { Navigation } from "./Navigation";
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "Affiliate was Approved",
      description: "Tech Justice Collective was approved",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Marketplace transaction pending approval",
      description: "Digital Democracy Project - $2,750",
      icon: <ShoppingCart className="h-5 w-5 text-purple-500" />,
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Billing balance overdue",
      description: "INV-2023-005 - $1,200.00",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      time: "3 days ago",
    },
  ];
  return (
    <header className="bg-[#FDFDF8] border-b-2 border-black border-dashed sticky top-0 z-10 transform rotate-[-0.1deg]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="relative transform rotate-[0.5deg]">
                <img
                  className="h-10 w-auto"
                  src="https://can2-prod.s3.amazonaws.com/uploads/data/001/034/218/original/tmc_icon_500x500_white_black_transparent.png"
                  alt="The Movement Cooperative"
                />
                <div className="absolute -inset-1 rounded-md transform rotate-[-0.8deg] pointer-events-none opacity-30"></div>
              </div>
            </div>
            <Navigation className="hidden md:ml-6 md:flex md:space-x-8" />
          </div>
          <div className="flex items-center">
            <button
              className="relative bg-[#000000] hover:bg-black/90 text-white px-3 py-1 rounded-md text-sm font-bold hidden md:block transform rotate-[-0.3deg] transition-all duration-300 hover:rotate-[0.2deg]
              after:content-[''] after:absolute after:inset-0 after:border-2 after:border-black after:rounded-md after:transform after:rotate-[0.4deg] after:translate-x-[1px] after:translate-y-[1px] after:pointer-events-none after:z-[-1]"
            >
              <div className="flex items-center relative z-10">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>Slack</span>
              </div>
            </button>
            <div className="ml-4 relative group">
              <button className="relative p-1 rounded-full text-black hover:text-[#2E86AB] transform rotate-[0.3deg] transition-all duration-300 hover:rotate-[-0.2deg]">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-[#CC2936] text-white text-xs font-bold flex items-center justify-center transform rotate-[-0.8deg]">
                  3
                </span>
              </button>
              {/* Notification preview on hover */}
              <div
                className="hidden group-hover:block absolute right-0 mt-2 w-80 bg-[#FDFDF8] rounded-md z-20 overflow-hidden transform rotate-[0.2deg]
                before:content-[''] before:absolute before:inset-0 before:border-2 before:border-black before:rounded-md before:transform before:rotate-[-0.3deg] before:pointer-events-none before:z-[-1]
                after:content-[''] after:absolute after:inset-0 after:border-2 after:border-black after:rounded-md after:transform after:rotate-[0.1deg] after:translate-x-[1px] after:translate-y-[1px] after:pointer-events-none after:z-[-1]"
              >
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Notifications
                  </h3>
                </div>
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          {notification.icon}
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {notification.description}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 bg-gray-50 text-center">
                  <a
                    href="#"
                    className="text-sm font-medium text-primary hover:text-primary/90"
                  >
                    View all notifications
                  </a>
                </div>
              </div>
            </div>
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
