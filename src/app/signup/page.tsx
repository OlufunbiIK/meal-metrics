"use client";

import React, { useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import FormInput from "../layout/FormInput";
import { useRouter } from "next/navigation";

export default function RestaurantSignup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
  });

  const [touched, setTouched] = useState({
    fullname: false,
    email: false,
  });

  // Validation functions
  const validateFullname = (fullname: string) => {
    if (!fullname) return "Full name is required";
    if (fullname.length < 2) return "Full name must be at least 2 characters";
    return "";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.email &&
      formData.fullname &&
      !validateFullname(formData.fullname) &&
      !validateEmail(formData.email)
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
      if (name === "email") error = validateEmail(value);
      if (name === "fullname") error = validateFullname(value);

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
    if (name === "email") error = validateEmail(value);
    if (name === "fullname") error = validateFullname(value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      fullname: true,
      email: true,
    });

    // Validate all fields
    const fullnameError = validateFullname(formData.fullname);
    const emailError = validateEmail(formData.email);

    setErrors({
      fullname: fullnameError,
      email: emailError,
    });

    // Only submit if no errors
    if (!fullnameError && !emailError) {
      console.log("Form submitted:", formData);
      // Before redirecting
      sessionStorage.setItem("signupData", JSON.stringify(formData));
      // Redirect to password page
      router.push("/password");
    }
  };

  const subtitle = (
    <>
      Already have an account?{" "}
      <a
        href="./login"
        className="text-teal-500 hover:text-teal-600 font-medium"
      >
        Sign In
      </a>
    </>
  );

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle={subtitle}
      progressBarSrc="/images/1st Progress Bar.svg"
    >
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
        <FormInput
          type="text"
          name="fullname"
          placeholder="Full name"
          value={formData.fullname}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.fullname}
          touched={touched.fullname}
        />

        <FormInput
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
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
          Create Account
        </button>
      </form>
    </AuthLayout>
  );
}
