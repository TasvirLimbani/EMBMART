"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isReady, openLogin } = useAuth();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      openLogin(); // open login modal
    }
  }, [isReady, isAuthenticated, openLogin]);

  // ⏳ wait for auth to restore
  if (!isReady) {
    return <p className="p-6">Loading...</p>;
  }

  // ❌ not logged in
  if (!isAuthenticated) {
    return null;
  }

  // ✅ logged in
  return <>{children}</>;
}
