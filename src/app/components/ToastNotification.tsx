"use client";

import React, { useState, useEffect } from "react";
import { Check, X, Heart, HeartOff } from "lucide-react";

// Toast props typing
type ToastType = "success" | "error" | "favorite-added" | "favorite-removed";

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  isVisible,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Check className="w-5 h-5 text-green-600" />;
      case "error":
        return <X className="w-5 h-5 text-red-600" />;
      case "favorite-added":
        return <Heart className="w-5 h-5 text-red-500 fill-current" />;
      case "favorite-removed":
        return <HeartOff className="w-5 h-5 text-gray-500" />;
      default:
        return <Check className="w-5 h-5 text-green-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
      case "favorite-added":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "favorite-removed":
        return "bg-gray-50 border-gray-200";
      default:
        return "bg-green-50 border-green-200";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      } ${getBackgroundColor()}`}
    >
      {getIcon()}
      <span className="text-sm font-medium text-gray-800">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Hook state typing
interface ToastState {
  isVisible: boolean;
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  };

  const ToastComponent = () => (
    <Toast
      message={toast.message}
      type={toast.type}
      isVisible={toast.isVisible}
      onClose={hideToast}
    />
  );

  return {
    showToast,
    hideToast,
    ToastComponent,
  };
};

export default Toast;
