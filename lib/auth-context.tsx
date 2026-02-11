// "use client";

// import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// interface User {
//   id: number;
//   firstname: string;
//   lastname: string;
//   email: string;
//   address: string;
//   city: string;
//   name: string;
//   phonenumber: string;
//   created_at: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isReady: boolean; // ✅ ADD THIS
//   loginWithUser: (user: User) => void;
//   logout: () => void;
//   isLoginOpen: boolean;
//   isRegisterOpen: boolean;
//   openLogin: () => void;
//   openRegister: () => void;
//   closeModals: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isReady, setIsReady] = useState(false); // ✅ ADD THIS
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isRegisterOpen, setIsRegisterOpen] = useState(false);

//   // 🔁 Restore user on refresh
//   useEffect(() => {
//     const storedUser = localStorage.getItem("embmart_user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setIsReady(true); // ✅ VERY IMPORTANT
//   }, []);

//   const loginWithUser = (userData: User) => {
//     setUser(userData);
//     localStorage.setItem("embmart_user", JSON.stringify(userData));
//     closeModals();
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("embmart_user");
//   };

//   const openLogin = () => {
//     setIsRegisterOpen(false);
//     setIsLoginOpen(true);
//   };

//   const openRegister = () => {
//     setIsLoginOpen(false);
//     setIsRegisterOpen(true);
//   };

//   const closeModals = () => {
//     setIsLoginOpen(false);
//     setIsRegisterOpen(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isReady, // ✅ PROVIDE IT
//         loginWithUser,
//         logout,
//         isLoginOpen,
//         isRegisterOpen,
//         openLogin,
//         openRegister,
//         closeModals,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// }







"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  city: string;
  name: string;
  phonenumber: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isReady: boolean;
  loginWithUser: (user: User) => void;
  logout: () => void;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeModals: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // 🔁 Restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("embmart_user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsReady(true);
  }, []);

  const loginWithUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("embmart_user", JSON.stringify(userData));
    closeModals();
  };

  const logout = () => {
    if (user?.id) {
      localStorage.removeItem(`cart_${user.id}`); // ✅ Clear current user's cart
      localStorage.removeItem(`embmart_user`); // ✅ Clear current user's cart
    }
    setUser(null);
    localStorage.removeItem("embmart_user");
  };

  const openLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const openRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isReady,
        loginWithUser,
        logout,
        isLoginOpen,
        isRegisterOpen,
        openLogin,
        openRegister,
        closeModals,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
