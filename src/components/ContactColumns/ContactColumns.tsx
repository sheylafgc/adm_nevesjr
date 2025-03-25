"use client";

import { ContactsProps } from "@/domain/Contact/Contact";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const contactColumns: ColumnDef<ContactsProps>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const message = row.getValue<string>("message");

      return (
        <Dialog>
          <DialogTrigger className="bg-black py-2 px-5 text-white rounded-xl hover:bg-gray-800 ">
            See message
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message</DialogTitle>
            </DialogHeader>
            {message}
          </DialogContent>
        </Dialog>
      );
    },
  },
];
