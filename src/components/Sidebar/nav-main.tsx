"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { state, setOpenMobile } = useSidebar();
  const isCollapsed: boolean = state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                size="lg"
                tooltip={isCollapsed ? item.title : undefined}
                onClick={() => {
                  router.push(item.url);
                  setOpenMobile(false);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg transition-colors",
                  "p-2 hover:bg-gray-50",
                  isActive ? "bg-blue-50 text-blue-700" : "text-gray-700",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
              >
                {item.icon && (
                  <item.icon
                    className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-2")}
                  />
                )}
                {!isCollapsed && (
                  <>
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
