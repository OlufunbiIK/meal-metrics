"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Lock, Bell, Globe, LogOut, Camera } from "lucide-react";
import DashboardLayout from "@/app/layout/DashboardLayout";

const Settings = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const languages = [
    "English (US)",
    "English (UK)",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
  ];

  // Load user data from localStorage/sessionStorage on component mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        // Try localStorage first (after login)
        let storedData = localStorage.getItem("userData");

        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          setEditedData({
            firstName: parsedData.firstName || "",
            lastName: parsedData.lastName || "",
            email: parsedData.email || "",
          });
          return;
        }

        // Fallback to sessionStorage
        const signupData = sessionStorage.getItem("signupData");
        const roleData = sessionStorage.getItem("roleData");

        if (signupData) {
          const parsedSignup = JSON.parse(signupData);
          const parsedRole = roleData ? JSON.parse(roleData) : {};

          const combinedData = {
            firstName: parsedSignup.firstName || "",
            lastName: parsedSignup.lastName || "",
            fullName:
              parsedSignup.fullName ||
              `${parsedSignup.firstName || ""} ${
                parsedSignup.lastName || ""
              }`.trim(),
            email: parsedSignup.email || "",
            role: parsedRole.role || "User",
          };

          setUserData(combinedData);
          setEditedData({
            firstName: combinedData.firstName,
            lastName: combinedData.lastName,
            email: combinedData.email,
          });

          // Save to localStorage for persistence
          localStorage.setItem("userData", JSON.stringify(combinedData));
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();

    // Load profile image if exists
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }

    // Load notification preference
    const notifPref = localStorage.getItem("notificationsEnabled");
    if (notifPref !== null) {
      setNotificationsEnabled(notifPref === "true");
    }

    // Load language preference
    const langPref = localStorage.getItem("selectedLanguage");
    if (langPref) {
      setSelectedLanguage(langPref);
    }
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSave = () => {
    const updatedData = {
      ...userData,
      firstName: editedData.firstName,
      lastName: editedData.lastName,
      fullName: `${editedData.firstName} ${editedData.lastName}`,
      email: editedData.email,
    };

    setUserData(updatedData);
    setIsEditing(false);

    // Update localStorage
    localStorage.setItem("userData", JSON.stringify(updatedData));

    // Also update sessionStorage for backward compatibility
    const existingSignupData = sessionStorage.getItem("signupData");
    if (existingSignupData) {
      const parsedSignup = JSON.parse(existingSignupData);
      const updatedSignupData = {
        ...parsedSignup,
        firstName: editedData.firstName,
        lastName: editedData.lastName,
        fullName: `${editedData.firstName} ${editedData.lastName}`,
        email: editedData.email,
      };
      sessionStorage.setItem("signupData", JSON.stringify(updatedSignupData));
    }

    // Dispatch a custom event to notify Header component
    window.dispatchEvent(
      new CustomEvent("userDataUpdated", {
        detail: updatedData,
      })
    );

    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    });
    setIsEditing(false);
  };

  const handlePasswordChange = (e: any) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordSave = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert("New passwords don't match!");
      return;
    }
    if (passwordData.new.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    // Store password (in real app, this would be sent to backend)
    const currentUserData = localStorage.getItem("userData");
    if (currentUserData) {
      const parsedData = JSON.parse(currentUserData);
      parsedData.password = passwordData.new;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    }

    alert("Password changed successfully!");
    setShowPasswordModal(false);
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        localStorage.setItem("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationToggle = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem("notificationsEnabled", newValue.toString());
  };

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    setShowLanguageModal(false);
    localStorage.setItem("selectedLanguage", lang);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      // Clear all stored data
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      localStorage.removeItem("profileImage");
      localStorage.removeItem("notificationsEnabled");
      localStorage.removeItem("selectedLanguage");
      sessionStorage.removeItem("signupData");
      sessionStorage.removeItem("roleData");

      alert("Logged out successfully!");
      window.location.href = "/login";
    }
  };

  return (
    <DashboardLayout activeTab="Dashboard">
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#333333]">
              Settings
            </h1>
            <p className="text-[#333333] opacity-70 text-sm mt-1">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#333333]">
                Profile Information
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-[#008080] hover:text-teal-600 text-sm font-medium"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Picture */}
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-[#008080] rounded-full p-2 hover:bg-teal-600 cursor-pointer">
                  <Camera className="h-3 w-3 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-[#333333]">
                  {userData.fullName || "User Name"}
                </h3>
                <p className="text-sm text-[#333333] opacity-70 capitalize">
                  {userData.role || "User"}
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editedData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border text-[#333333] ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                        : "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                    } outline-none transition-all`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editedData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border text-[#333333] ${
                      isEditing
                        ? "border-gray-300 focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                        : "border-gray-200 cursor-not-allowed bg-gray-50"
                    } outline-none transition-all`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border text-[#333333] ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                      : "border-gray-200 cursor-not-allowed bg-gray-50"
                  } outline-none transition-all`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={userData.role}
                  disabled
                  className="w-full px-4 cursor-not-allowed py-3 rounded-lg border border-gray-200 bg-gray-50 outline-none capitalize text-[#333333]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#008080] text-white py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-[#333333] py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
            <h2 className="text-lg font-semibold text-[#333333] mb-4">
              Security
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-[#333333]" />
                  <div className="text-left">
                    <p className="font-medium text-[#333333]">
                      Change Password
                    </p>
                    <p className="text-sm text-[#333333] opacity-70">
                      Update your password
                    </p>
                  </div>
                </div>
                <span className="text-[#333333] opacity-40">→</span>
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
            <h2 className="text-lg font-semibold text-[#333333] mb-4">
              Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-[#333333]" />
                  <div>
                    <p className="font-medium text-[#333333]">Notifications</p>
                    <p className="text-sm text-[#333333] opacity-70">
                      {notificationsEnabled ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled}
                    onChange={handleNotificationToggle}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008080]"></div>
                </label>
              </div>

              <button
                onClick={() => setShowLanguageModal(true)}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-[#333333]" />
                  <div className="text-left">
                    <p className="font-medium text-[#333333]">Language</p>
                    <p className="text-sm text-[#333333] opacity-70">
                      {selectedLanguage}
                    </p>
                  </div>
                </div>
                <span className="text-[#333333] opacity-40">→</span>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-200">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Danger Zone
            </h2>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 p-4 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-[#333333] mb-4">
                Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="current"
                    value={passwordData.current}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008080] focus:border-transparent outline-none text-[#333333]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new"
                    value={passwordData.new}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008080] focus:border-transparent outline-none text-[#333333]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    value={passwordData.confirm}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#008080] focus:border-transparent outline-none text-[#333333]"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handlePasswordSave}
                  className="flex-1 bg-[#008080] text-white py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium"
                >
                  Save Password
                </button>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ current: "", new: "", confirm: "" });
                  }}
                  className="flex-1 bg-gray-200 text-[#333333] py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Language Selection Modal */}
        {showLanguageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-[#333333] mb-4">
                Select Language
              </h3>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageSelect(lang)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedLanguage === lang
                        ? "bg-[#008080] text-white"
                        : "bg-gray-50 text-[#333333] hover:bg-gray-100"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="w-full mt-4 bg-gray-200 text-[#333333] py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
