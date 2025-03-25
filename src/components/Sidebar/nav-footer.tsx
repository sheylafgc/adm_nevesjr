"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { PiSignOutBold } from "react-icons/pi";

export function NavFooter() {
  const { signOut } = useContext(AuthContext);
  const { state } = useSidebar();
  const isCollapsed: boolean = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className={cn(
            "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
            "bg-black text-white hover:bg-gray-800 hover:text-white",
            "flex items-center justify-center",
            isCollapsed ? "p-2" : "px-4 py-2"
          )}
          onClick={() => signOut()}
        >
          <PiSignOutBold size={18} className="text-white" />
          {!isCollapsed && <span className="ml-2">Log out</span>}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
