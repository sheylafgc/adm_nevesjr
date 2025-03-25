"use client";

import { PartnersProps } from "@/domain/Partners/Partners";
import { ColumnDef } from "@tanstack/react-table";

export const partnersColumns: ColumnDef<PartnersProps>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "car_model",
    header: "Car Model",
  },
];
