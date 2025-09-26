"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Settings,
} from "lucide-react";

interface HeaderProps {
  userName?: string;
  isMobile: boolean;
  onMenuToggle: () => void;
  pageTitle?: string;
  onLogout?: () => void;
  onProfileClick?: () => void;
}

interface UserData {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  role?: string;
}

const Header: React.FC<HeaderProps> = ({
  userName,
  isMobile,
  onMenuToggle,
  pageTitle,
  onLogout,
  onProfileClick,
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get user data from localStorage/sessionStorage on component mount
  useEffect(() => {
    const getUserData = () => {
      try {
        // Try to get from localStorage first (after login)
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          return parsedData;
        }

        // Fallback to sessionStorage if needed
        const sessionUserData = sessionStorage.getItem("userData");
        if (sessionUserData) {
          const parsedData = JSON.parse(sessionUserData);
          return parsedData;
        }

        // If no stored data, try to get from individual storage items
        // This handles cases where data might be stored separately
        const signupData = sessionStorage.getItem("signupData");
        const roleData = sessionStorage.getItem("roleData");

        let combinedData: UserData = {};

        if (signupData) {
          const parsed = JSON.parse(signupData);
          combinedData = { ...combinedData, ...parsed };
        }

        if (roleData) {
          const parsed = JSON.parse(roleData);
          combinedData = { ...combinedData, ...parsed };
        }

        return combinedData;
      } catch (error) {
        console.error("Error parsing user data:", error);
        return {};
      }
    };

    const data = getUserData();
    setUserData(data);
  }, []);

  // Get display name - priority: fullName > firstName + lastName > userName prop > default
  const getDisplayName = () => {
    if (userData.fullName) {
      return userData.fullName;
    }

    if (userData.firstName && userData.lastName) {
      return `${userData.firstName} ${userData.lastName}`;
    }

    if (userData.firstName) {
      return userData.firstName;
    }

    return userName || "User";
  };

  // Get first name for welcome message
  const getFirstName = () => {
    if (userData.firstName) {
      return userData.firstName;
    }

    if (userData.fullName) {
      return userData.fullName.split(" ")[0];
    }

    if (userName) {
      return userName.split(" ")[0];
    }

    return "User";
  };

  // Get user role with fallback
  const getUserRole = () => {
    return userData.role || "User";
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

  const isDashboard = pageTitle === "Dashboard";
  const displayName = getDisplayName();
  const firstName = getFirstName();
  const userRole = getUserRole();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Handle logout
  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      // Default logout logic
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      sessionStorage.removeItem("signupData");
      sessionStorage.removeItem("roleData");
      sessionStorage.removeItem("userData");

      // Redirect to login page
      window.location.href = "/login";
    }
  };

  // Handle profile click
  const handleProfileClick = () => {
    setIsProfileDropdownOpen(false);
    if (onProfileClick) {
      onProfileClick();
    } else {
      // Default profile navigation
      window.location.href = "/profile";
    }
  };

  // Handle settings click
  const handleSettingsClick = () => {
    setIsProfileDropdownOpen(false);
    window.location.href = "/dashboard/settings";
  };

  return (
    <header className="bg-[#f8f8f8] border-b border-gray-200 px-4 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu Button */}
          {isMobile && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          )}

          <div>
            <h1 className="text-xl lg:text-[28px] md:text-[22px] text-[18px] font-bold text-gray-900 lg:mb-2">
              {isDashboard ? `Welcome back, ${firstName}!` : pageTitle}
            </h1>

            <p className="text-gray-500 text-xs text-[14px] hidden sm:block">
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
              className="w-64 xl:w-80 pl-10 pr-4 py-3 px-3 bg-white rounded-full text-[#BABABA] text-[12px] focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Search button for mobile/tablet */}
          <button className="p-2 text-gray-400 hover:text-gray-600 lg:hidden">
            <Search className="h-5 w-5" />
          </button>

          {/* Notification Bell */}
          <button className="relative w-10 h-10 p-2 flex justify-center items-center bg-white rounded-full hover:text-gray-600">
            <img src="/images/Group 54993.svg" alt="Notification Icon" />
          </button>

          {/* User Profile with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-full p-2 transition-colors bg-[#EEEEEE]"
              onClick={toggleProfileDropdown}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <img src="/images/Frame 1618869002.svg" alt="User Avatar" />
              </div>
              <span className="text-sm text-black font-medium hidden sm:inline">
                {displayName}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 hidden sm:block transition-transform ${
                  isProfileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                </div>

                <button
                  onClick={handleProfileClick}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
                >
                  <User className="h-4 w-4" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={handleSettingsClick}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>

                <div className="border-t border-gray-100 mt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
