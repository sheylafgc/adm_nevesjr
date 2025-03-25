"use client";
import Image from "next/image";
import LogoBlack from "@/brand/logoBlack.svg";

export default function Footer() {
  return (
    <footer
      className={`w-full lg:h-44 border-t flex justify-center items-center`}
    >
      <div className="lg:w-[80%] w-[90%] h-full flex lg:flex-row lg:py-0 py-16 flex-col justify-around lg:items-center items-start lg:gap-0 gap-10">
        <span className="lg:text-sm text-gray2 order-2">
          Política de privacidade
        </span>
        <span className="lg:text-sm text-gray2 order-3">
          NevesJR - All Rights Reserved - 2024
        </span>
        <Image
          width={150}
          height={150}
          src={LogoBlack}
          className="order-1"
          alt="NevesJr Logo"
        />
      </div>
    </footer>
  );
}
