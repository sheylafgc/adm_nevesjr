"use client";
import { columns } from "@/components/Columns/Columns";
import DataTable from "@/components/DataTable/DataTable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getFutureAdminBookings,
  getPastAdminBookings,
  getCanceledAdminBookings,
  getPendingAdminBookings,
} from "@/domain/Bookings/Bookings";
import { useQuery } from "@tanstack/react-query";

export default function Internal() {
  const { data: pastBookings } = useQuery({
    queryKey: ["futureAdminBookings"],
    queryFn: getPastAdminBookings,
  });
  const { data: futureBookings } = useQuery({
    queryKey: ["pastAdminBookings"],
    queryFn: getFutureAdminBookings,
  });
  const { data: canceledBookings } = useQuery({
    queryKey: ["canceledAdminBookings"],
    queryFn: getCanceledAdminBookings,
  });
  const { data: pendingBookings } = useQuery({
    queryKey: ["pendingAdminBookings"],
    queryFn: getPendingAdminBookings,
  });

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="lg:w-[80%] w-[90%] flex flex-col justify-center items-center py-32">
        <Tabs defaultValue="Upcoming" className="w-full ">
          <TabsList className="my-4 border-b">
            <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="Past">Past</TabsTrigger>
            <TabsTrigger value="Canceled">Canceled</TabsTrigger>
            <TabsTrigger value="Pending">Pending</TabsTrigger>
          </TabsList>
          <TabsContent value="Upcoming">
            <div className="container mx-auto">
              <DataTable columns={columns} data={futureBookings ?? []} />
            </div>
          </TabsContent>
          <TabsContent value="Past">
            <div className="container mx-auto">
              <DataTable columns={columns} data={pastBookings ?? []} />
            </div>
          </TabsContent>
          <TabsContent value="Canceled">
            <div className="container mx-auto">
              <DataTable columns={columns} data={canceledBookings ?? []} />
            </div>
          </TabsContent>
          <TabsContent value="Pending">
            <div className="container mx-auto">
              <DataTable columns={columns} data={pendingBookings ?? []} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
