"use client";

import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  progressBarSrc?: string;
  backArrow?: boolean;
  onBackClick?: () => void;
  showRoleForm?: boolean;
  showForgotPassword?: boolean;
  backgroundImageUrl?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  progressBarSrc,
  backArrow,
  onBackClick,
  showRoleForm = false,
  showForgotPassword = false,
  backgroundImageUrl,
}: AuthLayoutProps) {
  const [selectedRole, setSelectedRole] = React.useState("");
  const [selectedExperience, setSelectedExperience] = React.useState("");

  // Default background image if none provided
  const defaultBackground =
    "/images/7e09f1ae7f5f6a41295497f9198e59bb477c2ca3.png";
  const backgroundImage = backgroundImageUrl || defaultBackground;

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${backgroundImage}')`,
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Mobile Top Text Content */}
        <div className="lg:hidden p-6 pt-8 pb-4 text-center w-full">
          <div className="max-w-lg mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
              Manage inventory, menus, and staff schedules all in one place
            </h2>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
              Our all-in-one solution brings your kitchen operations into
              perfect harmony
            </p>
          </div>
        </div>

        {/* Left Panel - Form */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center p-4 py-4 lg:py-16">
          <div className="w-full max-w-md mx-auto h-full flex flex-col justify-between min-h-[calc(100vh-16rem)] lg:min-h-[calc(100vh-8rem)]">
            {/* Logo/Icon at top - hidden on mobile since we have text above */}
            <div className="hidden lg:flex justify-center pt-8"></div>

            {/* Form in center */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl flex-grow flex flex-col justify-center my-4 lg:my-8 relative">
              {progressBarSrc && (
                <div className="flex justify-between items-center">
                  <img
                    src={progressBarSrc}
                    alt="progress bar"
                    className="absolute top-6 right-4 sm:top-8 sm:right-6"
                  />
                </div>
              )}

              {/* Back Arrow */}
              {backArrow && (
                <img
                  src="/images/Arrow 1.svg"
                  onClick={onBackClick}
                  alt="back arrow"
                  className="absolute top-6 left-4 sm:top-8 sm:left-6 cursor-pointer hover:opacity-70 transition-opacity"
                />
              )}

              <div className="mb-4 lg:mb-0">
                <img
                  src="/images/Star 1.svg"
                  alt="Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 mb-2"
                />
              </div>

              <h1 className="text-xl text-left sm:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">
                {title}
              </h1>

              {/* Role-specific form elements */}
              {showRoleForm && (
                <div className="mb-6 space-y-6">
                  {/* Experience Level Dropdown */}
                  <div>
                    <select
                      id="experience"
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="w-full px-3 py-4 border border-[#DBDFE4] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm text-[#808A9A]"
                    >
                      <option value="">Select Roles</option>
                      <option value="customer">Customer</option>
                      <option value="chef">Chef</option>
                      <option value="delivery_partner">Delivery Partner</option>
                      <option value="restaurant_owner">Restaurant Owner</option>
                    </select>
                  </div>

                  {/* Radio Buttons for Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Meal Preference
                    </label>
                    <div className="flex flex-row justify-between items-center text-[#0A0B0B]">
                      {["Vegetarian", "Vegan", "Gluten-free"].map((role) => (
                        <label
                          key={role}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={selectedRole === role}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-4 h-4 text-green-600 border-green-500 focus:ring-green-500"
                          />

                          <span className="ml-1 text-sm text-gray-700">
                            {role}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Form content passed as children */}
              {children}

              {showForgotPassword && (
                <div className="mt-4 sm:mt-6 text-center">
                  <a
                    href="./forgot-password"
                    className="text-sm text-teal-500 hover:text-teal-600 font-medium"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              {subtitle && (
                <div className="mt-4 sm:mt-6 text-center">
                  <p className="text-sm text-gray-600">{subtitle}</p>
                </div>
              )}
            </div>

            {/* Empty space at bottom to push content up */}
            <div className="pb-4 lg:pb-8"></div>
          </div>
        </div>

        {/* Vertical Divider - Hidden on mobile */}
        <div className="hidden lg:block bg-white w-[0.5px] h-screen"></div>

        {/* Right Panel - Text Content - Desktop only */}
        <div className="hidden lg:flex flex-1 items-end justify-end p-8 xl:p-12 pb-12 xl:pb-16">
          <div className="w-full text-left">
            <h2 className="text-2xl xl:text-4xl font-bold text-white mb-4 xl:mb-6 leading-tight">
              Manage inventory, menus, and staff schedules all in one place
            </h2>
            <p className="text-lg xl:text-xl text-gray-200 leading-relaxed">
              Our all-in-one solution brings your kitchen operations into
              perfect harmony
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
