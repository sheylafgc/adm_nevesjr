"use client";

import { AppSidebar } from "@/components/Sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import LogoBlack from "../brand/logoBlack.svg";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");
  const { isMobile, setOpenMobile, openMobile } = useSidebar();

  return (
    <>
      {!isAuthRoute ? (
        <>
          <AppSidebar side={isMobile ? "right" : "left"} />
          <SidebarInset>
            {isMobile ? (
              <div className="w-full flex items-center justify-center fixed top-0 z-20">
                <div className="flex items-center justify-between w-full lg:w-[80%] bg-gray1 h-24 rounded-b-[16px] px-6 lg:px-9 shadow-md">
                  <Link href={"/"}>
                    <Image src={LogoBlack} priority alt="logoImage" />
                  </Link>
                  <button
                    className="lg:hidden text-gray2 text-2xl"
                    onClick={() => setOpenMobile(!openMobile)}
                  >
                    {openMobile ? (
                      <FaTimes size={25} className="text-black" />
                    ) : (
                      <FaBars size={25} className="text-black" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <SidebarTrigger className="ml-1 mt-1" />
            )}
            <main className="pl-[--sidebar-inset]">{children}</main>
          </SidebarInset>
        </>
      ) : (
        <main className="w-full flex justify-center items-center">
          {children}
        </main>
      )}
    </>
  );
}
