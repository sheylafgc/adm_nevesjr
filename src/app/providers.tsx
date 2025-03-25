"use client";

import { AuthProvider } from "@/context/AuthContext/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          {children}
          <ToastContainer />
        </SidebarProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
