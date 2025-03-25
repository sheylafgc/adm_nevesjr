"use client";
import { partnersColumns } from "@/components/PartnerColumns/PartnerColumns";
import PartnerDataTable from "@/components/PartnerDataTable/PartnerDataTable";
import { getPartners } from "@/domain/Partners/Partners";
import { useQuery } from "@tanstack/react-query";

export default function PartnersPage() {
  const { data: partners } = useQuery({
    queryKey: ["getPartners"],
    queryFn: getPartners,
  });

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="lg:w-[80%] w-[90%] flex flex-col justify-center items-center py-32">
        <div className="container mx-auto">
          <PartnerDataTable columns={partnersColumns} data={partners ?? []} />
        </div>
      </div>
    </div>
  );
}
