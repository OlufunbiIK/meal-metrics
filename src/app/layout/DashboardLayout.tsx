"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Header from "./Header";
import Sidebar from "./SideBar";
import { SidebarItem } from "./SideBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  userName?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  userName = "Sam Sam",
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sidebarItems = [
    {
      icon: "Home",
      label: "Dashboard",
      title: "Welcome back",
      href: "/dashboard",
    },
    {
      icon: "Package",
      label: "Inventory",
      title: "Inventory Management",
      href: "/dashboard/inventory",
    },
    {
      icon: "Calendar",
      label: "Menu Planning",
      title: "Plan Your Menu",
      href: "/dashboard/menu-planning",
    },
    {
      icon: "Users",
      label: "Staff Management",
      title: "Manage Your Staff",
      href: "/dashboard/staff",
    },
    {
      icon: "ShoppingCart",
      label: "Orders & Shopping",
      title: "Shopping",
      href: "/dashboard/orders",
    },
    {
      icon: "Shield",
      label: "Food Safety",
      title: "Ensure Food Safety",
      href: "/dashboard/food-safety",
    },
    {
      icon: "BarChart3",
      label: "Reports & Analysis",
      title: "Reports & Analytics",
      href: "/dashboard/reports",
    },
    {
      icon: "Settings",
      label: "Settings",
      title: "Account & Settings",
      href: "/dashboard/settings",
    },
  ];

  // Get current active tab based on pathname
  const getCurrentActiveTab = () => {
    const currentItem = sidebarItems.find((item) => item.href === pathname);
    return currentItem || { label: "Dashboard", title: "Welcome back" };
  };

  const [currentActiveTab, setCurrentActiveTab] = useState(
    getCurrentActiveTab()
  );

  // Update active tab when pathname changes
  useEffect(() => {
    setCurrentActiveTab(getCurrentActiveTab());
  }, [pathname]);

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

  const handleTabClick = (item: SidebarItem) => {
    setCurrentActiveTab(item);
    if (onTabChange) {
      onTabChange(item.label);
    }
    // Close sidebar on mobile after selection
    if (isMobile) {
      setIsSidebarOpen(false);
    }
    // Navigate to the route
    router.push(item.href);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#f8f8f8]">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        currentActiveTab={currentActiveTab.label}
        onTabClick={handleTabClick}
        onClose={handleSidebarClose}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header Component */}
        <Header
          userName={userName}
          isMobile={isMobile}
          onMenuToggle={toggleSidebar}
          pageTitle={currentActiveTab.title}
        />

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-auto p-2 md:p-3">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
