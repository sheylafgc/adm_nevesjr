"use client";

import { useState } from "react";
import CancelTripDialog from "../CancelTripDialog/CancelTripDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  CheckCircle,
  Info,
  MessageSquare,
  MoreHorizontal,
  XCircle,
} from "lucide-react";
import { BookingProps } from "@/domain/Bookings/Bookings";
import TripDetailsDialog from "../TripDetailsDialog/TripDetailsDialog";
import Link from "next/link";
import FinishTripDialog from "../FinishTripDialog/FinishTripDialog";

interface ActionCellProps {
  booking: BookingProps;
}

export default function ActionsCell({ booking }: ActionCellProps) {
  const [isCanceledDialogOpen, setIsCanceledDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false);

  return (
    <>
      <CancelTripDialog
        booking_id={booking.id}
        isOpen={isCanceledDialogOpen}
        onOpenChange={setIsCanceledDialogOpen}
      />

      <TripDetailsDialog
        booking={booking}
        isOpen={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />

      <FinishTripDialog
        booking_id={booking.id}
        isOpen={isFinishDialogOpen}
        onOpenChange={setIsFinishDialogOpen}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56 p-2 space-y-1 rounded-lg shadow-lg border border-gray-200 bg-white"
        >
          <DropdownMenuLabel className="px-2 py-1.5 font-semibold text-sm">
            Trip Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200" />

          <DropdownMenuItem
            onSelect={() => setIsDetailDialogOpen(true)}
            className="px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-150 text-sm"
          >
            <Info className="mr-2 h-4 w-4 text-blue-600" />
            <span>Details</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="px-2 py-1.5 rounded-md hover:bg-gray-100">
            <Link
              href={`https://wa.me/${booking.phone_number}`}
              className="flex items-center w-full text-sm"
            >
              <MessageSquare className="mr-2 h-4 w-4 text-green-600" />
              <span>Contact via WhatsApp</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => setIsFinishDialogOpen(true)}
            className="px-2 py-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors duration-150"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Complete Trip</span>
          </DropdownMenuItem>

          {booking.booking_status !== "canceled" && (
            <DropdownMenuItem
              onSelect={() => setIsCanceledDialogOpen(true)}
              className="px-2 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors duration-150 text-sm"
            >
              <XCircle className="mr-2 h-4 w-4" />
              <span>Cancel Trip</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
