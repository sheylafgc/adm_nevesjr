"use client";
import { contactColumns } from "@/components/ContactColumns/ContactColumns";
import ContactDataTable from "@/components/ContactDataTable/ContactDataTable";
import { getContacts } from "@/domain/Contact/Contact";
import { useQuery } from "@tanstack/react-query";

export default function ContactsPage() {
  const { data: contacts } = useQuery({
    queryKey: ["getContacts"],
    queryFn: getContacts,
  });

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="lg:w-[80%] w-[90%] flex flex-col justify-center items-center py-32">
        <div className="container mx-auto">
          <ContactDataTable columns={contactColumns} data={contacts ?? []} />
        </div>
      </div>
    </div>
  );
}
