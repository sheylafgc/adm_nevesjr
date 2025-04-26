"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveBooking } from "@/domain/Bookings/Bookings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bounce, toast } from "react-toastify";

type ApproveTripDialogProps = {
  booking_id: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function ApproveTripDialog({
  booking_id,
  isOpen,
  onOpenChange,
}: ApproveTripDialogProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => approveBooking(booking_id),
    onSuccess: () => {
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["futureAdminBookings"] });
      queryClient.invalidateQueries({ queryKey: ["pastAdminBookings"] });
      queryClient.invalidateQueries({ queryKey: ["canceledAdminBookings"] });
      queryClient.invalidateQueries({ queryKey: ["pendingAdminBookings"] });

      toast.success("Trip approved successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
    onError: () => {
      toast.error("Failed to approve trip. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
  });

  const handleFinishTrip = () => {
    mutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve Trip</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this trip? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="lg:gap-0 md:gap-0 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleFinishTrip}
            disabled={mutation.isPending}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {mutation.isPending ? "Approving..." : "Confirm Approval"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
