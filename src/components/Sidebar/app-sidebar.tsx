"use client";

import * as React from "react";
import { Handshake, LayoutDashboard, MessageSquareText } from "lucide-react";

import LogoBlack from "@/brand/logoBlack.svg";
import LogoIconBlack from "@/brand/logoIconBlack.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavFooter } from "./nav-footer";
import { FaTimes } from "react-icons/fa";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Contacts",
      url: "/Contacts",
      icon: MessageSquareText,
    },
    {
      title: "Partners",
      url: "/Partners",
      icon: Handshake,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const isCollapsed: boolean = state === "collapsed";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-10 flex flex-row lg:justify-center justify-between items-center lg:px-2 px-5">
        <Link href={"/"}>
          <Image
            src={isCollapsed ? LogoIconBlack : LogoBlack}
            priority
            alt="logoImage"
          />
        </Link>

        {isMobile && (
          <button
            className="lg:hidden text-gray2 text-2xl"
            onClick={() => setOpenMobile(false)}
          >
            <FaTimes size={25} className="text-black" />
          </button>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
