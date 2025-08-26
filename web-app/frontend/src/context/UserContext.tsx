import React, { useState, createContext, useContext } from "react";
// This is a simplified user context for demonstration purposes
// In a real application, this would be connected to your authentication system
interface User {
  id: string;
  name: string;
  email: string;
  organizationId: string; // The ID of the organization this user belongs to
  role: "admin" | "staff" | "member";
}
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
// Sample user for demonstration
const demoUser: User = {
  id: "1",
  name: "Maria Rodriguez",
  email: "maria@techjustice.org",
  organizationId: "1",
  role: "staff",
};
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(demoUser); // Pre-logged in for demo
  const login = (userData: User) => {
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
