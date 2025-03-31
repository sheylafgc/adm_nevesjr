"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finishTrip } from "@/domain/Bookings/Bookings";
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

type FinishTripDialogProps = {
  booking_id: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function FinishTripDialog({
  booking_id,
  isOpen,
  onOpenChange,
}: FinishTripDialogProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => finishTrip(booking_id),
    onSuccess: () => {
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["futureAdminBookings"] });
      queryClient.invalidateQueries({ queryKey: ["pastAdminBookings"] });
      queryClient.invalidateQueries({ queryKey: ["canceledAdminBookings"] });

      toast.success("Trip completed successfully", {
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
      toast.error("Failed to complete trip. Please try again.", {
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
          <DialogTitle>Complete Trip</DialogTitle>
          <DialogDescription>
            Are you sure you want to mark this trip as completed? This action
            cannot be undone.
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
            {mutation.isPending ? "Completing..." : "Confirm Completion"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
