"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Package,
  Calendar,
  Users,
  ShoppingCart,
  Shield,
  BarChart3,
  Settings,
  Search,
  Bell,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  userName?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab = "Dashboard",
  onTabChange,
  userName = "Sam Sam",
}) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(activeTab);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sidebarItems = [
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

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleTabClick = (item: (typeof sidebarItems)[0]) => {
    setCurrentActiveTab(item.label);
    if (onTabChange) {
      onTabChange(item.label);
    }
    // Close sidebar on mobile after selection
    if (isMobile) {
      setIsSidebarOpen(false);
    }
    console.log(`Navigate to: ${item.href}`);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex h-screen bg-[#f8f8f8]">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isMobile ? "fixed" : "relative"}
          ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
          w-60 bg-white border-r border-gray-200 flex-shrink-0 z-30
          transition-transform duration-300 ease-in-out
          ${isMobile ? "h-full" : ""}
        `}
      >
        <div className="p-6 border-b border-[#00000033] border-[0.5px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="./images/Star 1.svg" alt="Logo" className="" />
              <span className="text-lg font-semibold text-gray-900">
                Kitchen
              </span>
            </div>
            {/* Close button for mobile */}
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-lg hover:bg-gray-100 md:hidden"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        <nav className="px-4 space-y-8">
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
                onClick={() => handleTabClick(item)}
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

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <header className="bg-[#f8f8f8] border-b border-gray-200 px-2 md:px-4 py-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Hamburger Menu Button */}
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
                >
                  <Menu className="h-5 w-5 text-gray-600" />
                </button>
              )}

              <div>
                <h1 className="text-xl md:text-[28px] font-bold text-gray-900">
                  Welcome back, {userName.split(" ")[0]}!
                </h1>
                <p className="text-gray-500 text-xs text-[15px] hidden sm:block">
                  Today, {getCurrentDate()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Search - Hidden on small/medium screens, shown on large+ */}
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-3 px-3 bg-white rounded-full text-[#BABABA] text-[12px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Search button for mobile/tablet */}
              <button className="p-2 text-gray-400 hover:text-gray-600 lg:hidden">
                <Search className="h-5 w-5" />
              </button>

              {/* Notification Bell */}
              <button className="relative px-1 py-1 bg-white rounded-full hover:text-gray-600">
                {/* <Bell className="h-5 w-5" /> */}
                <img src="./images/Group 54993.svg" alt="Notification Icon" />
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-full p-2 transition-colors bg-[#EEEEEE]">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  {/* <User className="h-5 w-5 text-gray-600" /> */}
                  <img src="./images/Frame 1618869002.svg" alt="User Avatar" />
                </div>
                <span className="text-sm text-black font-medium hidden sm:inline">
                  {userName}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-auto p-2 md:p-3">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
