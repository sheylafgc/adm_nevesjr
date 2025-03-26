import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Providers } from "./providers";
import { ClientLayout } from "./clientLayout";

export const metadata: Metadata = {
  title: "Admin - Neves Jr",
  description: "Admin interface for managing NevesJr application",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export const monumentFontFamily = localFont({
  src: "../../public/fonts/MonumentExtended-Regular.otf",
  variable: "--font-monument",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={monumentFontFamily.variable}>
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
