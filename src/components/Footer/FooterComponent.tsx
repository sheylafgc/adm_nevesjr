"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterLayout() {
  const pathname = usePathname();

  const pathsWithoutFooter = ["/auth/Login"];

  const isFooterNeeded = !pathsWithoutFooter.some((path) =>
    pathname.startsWith(path)
  );

  // Renderiza o Footer apenas se isFooterNeeded for true
  return isFooterNeeded ? <Footer /> : null;
}
