"use client";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocationSearching } from "react-icons/md";

export function FromHeader() {
  return (
    <div className="flex justify-center items-center gap-2">
      From
      <IoLocationSharp size={18} className="text-gray2" />
    </div>
  );
}

export function ToHeader() {
  return (
    <div className="flex justify-center items-center gap-2">
      <MdLocationSearching size={18} className="text-gray2" />
      To
    </div>
  );
}

export function DateHeader() {
  return "Date";
}

export function HourHeader() {
  return "Hour";
}

export function PriceHeader() {
  return "Price";
}

export function PaymentHeader() {
  return "Payment";
}

export function PaymentStatusHeader() {
  return "Payment Status";
}

export function InvoiceHeader() {
  return "Invoice";
}
