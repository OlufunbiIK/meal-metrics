"use client";

import React, { useState } from "react";
import AuthLayout from "../components/shared/AuthLayout";
import FormInput from "../components/shared/FormInput";
import { useRouter } from "next/navigation";
import { UserDataManager } from "../utils/UserDataHelper";

export default function RoleAndPreference() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: "",
    allergies: "",
    preferences: "",
  });

  const [errors, setErrors] = useState({
    role: "",
    allergies: "",
    preferences: "",
  });

  const [touched, setTouched] = useState({
    role: false,
    allergies: false,
    preferences: false,
  });

  const roles = [
    "Kitchen Manager",
    "Head Chef",
    "Sous Chef",
    "Line Cook",
    "Prep Cook",
    "Pastry Chef",
    "Kitchen Assistant",
    "Food Service Manager",
    "Nutritionist",
    "Administrator",
  ];

  // Validation functions
  const validateRole = (role: string) => {
    if (!role) return "Role selection is required";
    return "";
  };

  const validateAllergies = (allergies: string) => {
    if (!allergies) return "Please specify allergies or write 'None'";
    return "";
  };

  const validatePreferences = (preferences: string) => {
    if (!preferences) return "Please specify preferences or write 'None'";
    return "";
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.role &&
      formData.preferences &&
      formData.allergies &&
      !validateRole(formData.role) &&
      !validateAllergies(formData.allergies) &&
      !validatePreferences(formData.preferences)
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    if (touched[name as keyof typeof touched]) {
      let error = "";
      if (name === "role") error = validateRole(value);
      if (name === "allergies") error = validateAllergies(value);
      if (name === "preferences") error = validatePreferences(value);

      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setTouched({
      ...touched,
      [name]: true,
    });

    // Validate on blur
    let error = "";
    if (name === "role") error = validateRole(value);
    if (name === "allergies") error = validateAllergies(value);
    if (name === "preferences") error = validatePreferences(value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      role: true,
      allergies: true,
      preferences: true,
    });

    // Validate all fields
    const roleError = validateRole(formData.role);
    const allergiesError = validateAllergies(formData.allergies);
    const preferencesError = validatePreferences(formData.preferences);

    setErrors({
      role: roleError,
      allergies: allergiesError,
      preferences: preferencesError,
    });

    // Only submit if no errors
    if (!roleError && !allergiesError && !preferencesError) {
      console.log("Form submitted:", formData);

      // Store the role and preference data using the helper
      UserDataManager.storeRoleData(formData);

      // Redirect to login page
      router.push("/login");
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  const subtitle = (
    <>
      Already have an account?{" "}
      <a
        href="/login"
        className="text-teal-500 hover:text-teal-600 font-medium"
      >
        Sign In
      </a>
    </>
  );

  return (
    <AuthLayout
      title="Select your role and tell us your meal preferences to get started"
      subtitle={subtitle}
      progressBarSrc="/images/1st Progress Bar (2).svg"
      backArrow={true}
      onBackClick={handleBackClick}
      showRoleForm={true}
    >
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
        {/* Role Selection Dropdown */}

        <FormInput
          type="text"
          name="allergies"
          placeholder="Enter your Allergies (or 'None')"
          value={formData.allergies}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.allergies}
          touched={touched.allergies}
        />

        <FormInput
          type="text"
          name="preferences"
          placeholder="Enter Other Preferences (or 'None')"
          value={formData.preferences}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.preferences}
          touched={touched.preferences}
        />

        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-3 sm:py-4 rounded-xl font-medium transition-all duration-200 mt-4 sm:mt-6 ${
            isFormValid()
              ? "bg-teal-500 text-white hover:bg-teal-600 cursor-pointer"
              : "bg-[#EBEBEB] text-white cursor-not-allowed"
          }`}
        >
          Complete Setup
        </button>
      </form>
    </AuthLayout>
  );
}
