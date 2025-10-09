"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Package,
  Calendar,
  Users,
  ShoppingCart,
  Shield,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  currentActiveTab: string;
  onTabClick: (item: SidebarItem) => void;
  onClose: () => void;
  onTabChange?: (label: string) => void;
}

export interface SidebarItem {
  icon: any;
  label: string;
  href: string;
  title?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isMobile,
  currentActiveTab,
  onTabClick,
  onClose,
}) => {
  const sidebarItems: SidebarItem[] = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Package, label: "Inventory", href: "/dashboard/inventory" },
    {
      icon: Calendar,
      label: "Menu Planning",
      href: "/dashboard/menu-planning",
    },
    { icon: Users, label: "Staff Management", href: "/dashboard/staff" },
    {
      icon: ShoppingCart,
      label: "Orders & Shopping",
      href: "/dashboard/orders",
    },
    { icon: Shield, label: "Food Safety", href: "/dashboard/food-safety" },
    {
      icon: BarChart3,
      label: "Reports & Analysis",
      href: "/dashboard/reports",
    },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isMobile ? "fixed" : "relative"}
          ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
          w-60 bg-white border-r border-gray-200 flex-shrink-0 z-30
          transition-transform duration-300 ease-in-out
          ${isMobile ? "h-full" : ""}
        `}
      >
        {/* Fixed sidebar header with consistent border */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/images/Star 1.svg" alt="Logo" className="" />
              <span className="text-lg font-semibold text-gray-900">
                Kitchen
              </span>
            </div>
            {/* Close button for mobile */}
            {isMobile && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 md:hidden"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        <nav className="px-4 py-6 space-y-8">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentActiveTab === item.label;
            return (
              <button
                key={index}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-[#008080] text-white"
                    : "text-[#474747] hover:bg-gray-100"
                }`}
                onClick={() => onTabClick(item)}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-white" : "text-black"
                  }`}
                />
                <span
                  className={`text-[16px] font-medium ${
                    isActive ? " text-white" : "text-[[#474747]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
