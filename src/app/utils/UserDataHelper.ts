// utils/userDataHelper.ts

export interface UserData {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
  allergies?: string;
  preferences?: string;
  password?: string;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface PasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface RoleFormData {
  role: string;
  allergies: string;
  preferences: string;
}

export class UserDataManager {
  // Store signup form data (form 1)
  static storeSignupData(data: SignupFormData) {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
    };

    sessionStorage.setItem("signupData", JSON.stringify(userData));
    return userData;
  }

  // Store password data (form 2)
  static storePasswordData(data: PasswordFormData) {
    const passwordData = {
      password: data.password,
    };

    sessionStorage.setItem("passwordData", JSON.stringify(passwordData));
    return passwordData;
  }

  // Store role and preferences data (form 3)
  static storeRoleData(data: RoleFormData) {
    const roleData = {
      role: data.role,
      allergies: data.allergies,
      preferences: data.preferences,
    };

    sessionStorage.setItem("roleData", JSON.stringify(roleData));
    return roleData;
  }

  // Get all user data (combines all forms)
  static getAllUserData(): UserData {
    try {
      const signupData = sessionStorage.getItem("signupData");
      const passwordData = sessionStorage.getItem("passwordData");
      const roleData = sessionStorage.getItem("roleData");

      let combinedData: UserData = {};

      if (signupData) {
        combinedData = { ...combinedData, ...JSON.parse(signupData) };
      }

      if (passwordData) {
        combinedData = { ...combinedData, ...JSON.parse(passwordData) };
      }

      if (roleData) {
        combinedData = { ...combinedData, ...JSON.parse(roleData) };
      }

      return combinedData;
    } catch (error) {
      console.error("Error getting user data:", error);
      return {};
    }
  }

  // Move data from session to local storage after successful login
  static finalizeUserData() {
    const completeUserData = this.getAllUserData();

    // Store in localStorage for persistent access
    localStorage.setItem("userData", JSON.stringify(completeUserData));

    // Clear session storage
    sessionStorage.removeItem("signupData");
    sessionStorage.removeItem("passwordData");
    sessionStorage.removeItem("roleData");

    return completeUserData;
  }

  // Get user data (checks localStorage first, then sessionStorage)
  static getCurrentUserData(): UserData {
    try {
      // First check localStorage (after login)
      const localData = localStorage.getItem("userData");
      if (localData) {
        return JSON.parse(localData);
      }

      // Fallback to session data (during signup process)
      return this.getAllUserData();
    } catch (error) {
      console.error("Error getting current user data:", error);
      return {};
    }
  }

  // Clear all user data
  static clearAllUserData() {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("signupData");
    sessionStorage.removeItem("passwordData");
    sessionStorage.removeItem("roleData");
  }

  // Get display name
  static getDisplayName(userData?: UserData): string {
    const data = userData || this.getCurrentUserData();

    if (data.fullName) return data.fullName;
    if (data.firstName && data.lastName)
      return `${data.firstName} ${data.lastName}`;
    if (data.firstName) return data.firstName;
    return "User";
  }

  // Get first name
  static getFirstName(userData?: UserData): string {
    const data = userData || this.getCurrentUserData();

    if (data.firstName) return data.firstName;
    if (data.fullName) return data.fullName.split(" ")[0];
    return "User";
  }

  // Get user role
  static getUserRole(userData?: UserData): string {
    const data = userData || this.getCurrentUserData();
    return data.role || "User";
  }
}
