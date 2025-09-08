"use client";

import React, { useState } from "react";
import AuthLayout from "../components/shared/AuthLayout";
import FormInput from "../components/shared/FormInput";
import { useRouter } from "next/navigation";

export default function RoleAndPreference() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    allergies: "",
    preferences: "",
  });

  const [errors, setErrors] = useState({
    allergies: "",
    preferences: "",
  });

  const [touched, setTouched] = useState({
    allergies: false,
    preferences: false,
  });

  // Validation functions
  const validateAllergies = (allergies: string) => {
    if (!allergies) return "Allergies are required";
    return "";
  };

  const validatePreferences = (preferences: string) => {
    if (!preferences) return "Preferences are required";
    return "";
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.preferences &&
      formData.allergies &&
      !validateAllergies(formData.allergies) &&
      !validatePreferences(formData.preferences)
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation
    if (touched[name as keyof typeof touched]) {
      let error = "";
      if (name === "email") error = validatePreferences(value);
      if (name === "allergies") error = validateAllergies(value);

      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTouched({
      ...touched,
      [name]: true,
    });

    // Validate on blur
    let error = "";
    if (name === "email") error = validatePreferences(value);
    if (name === "allergies") error = validateAllergies(value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      allergies: true,
      preferences: true,
    });

    // Validate all fields
    const allergiesError = validateAllergies(formData.allergies);
    const emailError = validatePreferences(formData.preferences);

    setErrors({
      allergies: allergiesError,
      preferences: emailError,
    });

    // Only submit if no errors
    if (!allergiesError && !emailError) {
      console.log("Form submitted:", formData);
      // Before redirecting
      sessionStorage.setItem("signupData", JSON.stringify(formData));
      // Redirect to password page
      router.push("/login");
    }
  };

  const handleBackClick = () => {
    // Form-specific logic here
    router.back("./password"); // or navigate('/previous-step')
  };

  const subtitle = (
    <>
      Already have an account?{" "}
      <a href="" className="text-teal-500 hover:text-teal-600 font-medium">
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
        <FormInput
          type="text"
          name="allergies"
          placeholder="Enter your Allergies"
          value={formData.allergies}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.allergies}
          touched={touched.allergies}
        />

        <FormInput
          type="text"
          name="preferences"
          placeholder="Enter Other Preferences"
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
