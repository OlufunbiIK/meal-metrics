"use client";

import React, { useState } from "react";
import AuthLayout from "../components/shared/AuthLayout";
import FormInput from "../components/shared/FormInput";
import { useRouter } from "next/navigation";

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
  met: boolean;
}

export default function ResetPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  // Password requirements checker
  const getPasswordRequirements = (password: string): PasswordRequirement[] => [
    {
      label: "A symbol or special character",
      test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    {
      label: "At least 8 characters strong",
      test: (pwd) => pwd.length >= 8,
      met: password.length >= 8,
    },
    {
      label: "One upper case character",
      test: (pwd) => /[A-Z]/.test(pwd),
      met: /[A-Z]/.test(password),
    },
    {
      label: "One lower case character",
      test: (pwd) => /[a-z]/.test(pwd),
      met: /[a-z]/.test(password),
    },
  ];

  const passwordRequirements = getPasswordRequirements(formData.password);
  const allRequirementsMet = passwordRequirements.every((req) => req.met);
  const metRequirementsCount = passwordRequirements.filter(
    (req) => req.met
  ).length;
  const progressPercentage =
    (metRequirementsCount / passwordRequirements.length) * 100;

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (!allRequirementsMet) return "Password must meet all requirements";
    return "";
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) return "Confirm password is required";
    if (confirmPassword !== formData.password) return "Passwords do not match";
    return "";
  };

  const getPasswordStrength = () => {
    switch (metRequirementsCount) {
      case 0:
      case 1:
        return { label: "Very Weak", color: "text-red-500" };
      case 2:
        return { label: "Weak", color: "text-orange-500" };
      case 3:
        return { label: "Strong", color: "text-yellow-500" };
      case 4:
        return { label: "Very Strong", color: "text-green-600" };
      default:
        return { label: "", color: "text-gray-500" };
    }
  };

  const { label: strengthLabel, color: strengthColor } = getPasswordStrength();

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.password &&
      formData.confirmPassword &&
      allRequirementsMet &&
      !validateConfirmPassword(formData.confirmPassword)
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
      if (name === "password") error = validatePassword(value);
      if (name === "confirmPassword") error = validateConfirmPassword(value);

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
    if (name === "password") error = validatePassword(value);
    if (name === "confirmPassword") error = validateConfirmPassword(value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      password: true,
      confirmPassword: true,
    });

    // Validate all fields
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword
    );

    setErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // Only submit if no errors
    if (!passwordError && !confirmPasswordError) {
      console.log("Form submitted:", formData);
      // Before redirecting
      sessionStorage.setItem("signupData", JSON.stringify(formData));
      // Redirect to password page
      router.push("/role");
    }
  };

  const handleBackClick = () => {
    // Form-specific logic here
    router.back("./signup"); // or navigate('/previous-step')
  };

  const subtitle = (
    <>
      Remember your password?{" "}
      <a href="" className="text-teal-500 hover:text-teal-600 font-medium">
        Sign In
      </a>
    </>
  );

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle={subtitle}
      progressBarSrc="/images/1st Progress Bar (1).svg"
      backArrow={true}
      onBackClick={handleBackClick}
    >
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.password}
          touched={touched.password}
        />

        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
        />

        {/* Password Requirements Checker */}
        {formData.password && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">
                Password Requirements:
              </h4>
              <span className="text-xs text-gray-500">
                {metRequirementsCount}/{passwordRequirements.length}
              </span>
            </div>

            {/* Overall Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metRequirementsCount === 1
                      ? "bg-red-500"
                      : metRequirementsCount === 2
                      ? "bg-orange-500"
                      : metRequirementsCount === 3
                      ? "bg-yellow-500"
                      : metRequirementsCount === 4
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Strength Label */}
            <p className={`text-sm font-medium mt-2 mb-2 ${strengthColor}`}>
              {strengthLabel}
            </p>

            {/* Requirements Grid - 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {passwordRequirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {/* Status indicator */}
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                      requirement.met ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    {requirement.met && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  {/* Requirement text */}
                  <span
                    className={`text-sm transition-colors ${
                      requirement.met
                        ? "text-green-700 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {requirement.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-3 sm:py-4 rounded-xl font-medium transition-all duration-200 mt-4 sm:mt-6 ${
            isFormValid()
              ? "bg-teal-500 text-white hover:bg-teal-600 cursor-pointer"
              : "bg-[#EBEBEB] text-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </form>
    </AuthLayout>
  );
}
