"use client";

import React, { useEffect, useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import FormInput from "../layout/FormInput";
import { useRouter } from "next/navigation";
import { UserDataManager } from "../utils/UserDataHelper";

export default function Login() {
  const router = useRouter();

  const [userName, setUserName] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Get user name from sessionStorage on component mount
  useEffect(() => {
    const signupData = sessionStorage.getItem("signupData");
    if (signupData) {
      try {
        const parsedData = JSON.parse(signupData);
        if (parsedData.fullName) {
          setUserName(parsedData.fullName);
        } else if (parsedData.firstName) {
          setUserName(parsedData.firstName);
        }
        if (parsedData.email) {
          setFormData((prev) => ({ ...prev, email: parsedData.email }));
        }
      } catch (error) {
        console.error("Error parsing signup data:", error);
      }
    }
  }, []);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      !validateEmail(formData.email) &&
      !validatePassword(formData.password)
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation if field has been touched
    if (touched[name as keyof typeof touched]) {
      let error = "";
      if (name === "email") error = validateEmail(value);
      if (name === "password") error = validatePassword(value);

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
    if (name === "password") error = validatePassword(value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });

    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    // Only proceed if no errors
    if (!emailError && !passwordError) {
      console.log("Login form submitted:", formData);

      // For local storage approach (no API)
      try {
        // Get signup data from sessionStorage
        const signupDataStr = sessionStorage.getItem("signupData");
        const roleDataStr = sessionStorage.getItem("roleData");

        console.log("signupDataStr:", signupDataStr);
        console.log("roleDataStr:", roleDataStr);

        let userData;

        if (signupDataStr) {
          // This is a user coming from signup flow
          const signupData = JSON.parse(signupDataStr);
          const roleData = roleDataStr ? JSON.parse(roleDataStr) : {};

          console.log("Parsed signupData:", signupData);
          console.log("Parsed roleData:", roleData);

          // Combine signup and role data
          userData = {
            firstName: signupData.firstName || "",
            lastName: signupData.lastName || "",
            fullName:
              signupData.fullName ||
              `${signupData.firstName || ""} ${
                signupData.lastName || ""
              }`.trim(),
            email: signupData.email || formData.email,
            role: roleData.role || "User",
          };
        } else {
          // This is an existing user - for now, we'll create a simple user object
          // In a real app, you'd validate credentials against your database
          userData = {
            firstName: "Returning",
            lastName: "User",
            fullName: "Returning User",
            email: formData.email,
            role: "User",
          };
        }

        console.log("Final userData to be stored:", userData);

        // Store user data in localStorage
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("authToken", "logged-in-" + Date.now());

        // Redirect to dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
        // Handle error appropriately
      }
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google clicked");
    // Implement Google sign-in logic here
  };

  return (
    <AuthLayout
      title={`Welcome Back${userName ? ` ${userName}` : ""}!`}
      backgroundImageUrl="/images/27a237ecd17dcd919d5b93ca8383b5068cddf388.png"
    >
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
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

        <div className="text-center w-full flex justify-end">
          <a
            href="./forgot-password"
            className="text-sm text-[#008080] hover:text-teal-600 font-medium"
          >
            Forgot Password?
          </a>
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-3 sm:py-4 rounded-xl font-medium transition-all duration-200 mt-2 sm:mt-2 ${
            isFormValid()
              ? "bg-[#008080] text-white hover:bg-teal-600 cursor-pointer"
              : "bg-[#EBEBEB] text-white cursor-not-allowed"
          }`}
        >
          Login
        </button>

        {/* OR divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google sign in button */}
        <button
          type="button"
          className="w-full py-3 sm:py-4 rounded-xl border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          onClick={handleGoogleSignIn}
        >
          {/* Google SVG logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>

          <span className="text-sm font-medium text-gray-700">
            Sign in with Google
          </span>
        </button>
      </form>

      {/* Subtitle positioned at bottom */}
      <div className="mt-10 pt-6 text-center text-sm text-gray-600">
        New to Kitchen?
        <a
          href="./signup"
          className="text-[#008080] ml-1 hover:text-teal-600 font-medium"
        >
          Create Account
        </a>
      </div>
    </AuthLayout>
  );
}
