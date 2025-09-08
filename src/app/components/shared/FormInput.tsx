"use client";

import React, { useState } from "react";

interface FormInputProps {
  type: "text" | "email" | "password";
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

export default function FormInput({
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <div className="relative">
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-[#EBEBEB] rounded-xl border-0 text-[#0A0B0B] placeholder-gray-500 focus:ring-2 focus:outline-none text-sm transition-colors ${
            type === "password" ? "pr-10 sm:pr-12" : ""
          } ${
            error && touched
              ? "focus:ring-red-500 bg-red-50"
              : "focus:ring-teal-500"
          }`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4"
          >
            {showPassword ? (
              // Eye slash icon (hide password)
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-700 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            ) : (
              // Eye icon (show password)
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-gray-700 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.065 7-9.543 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && touched && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
