"use client";
import { api } from "@/api/api";
import Cookies from "js-cookie";

export type BookingProps = {
  id: number;
  vehicle_details: {
    car_name: string;
    car_type: string;
    car_image: string;
  };
  from_route: string;
  to_route: string;
  date: string;
  hour: string;
  duration: string;
  estimated_time: string | null;
  distance_km: number;
  booking_for: "myself" | "someone_else";
  first_name: string;
  last_name: string;
  title: "Mr" | "Ms";
  email: string;
  phone_number: string;
  notes: string | null;
  amount: string;
  payment_date: Date;
  payment_intent_id: string;
  payment_status: "approved" | "canceled";
  payment_brand: string;
  booking_status: "upcoming" | "past" | "canceled" | "pending";
  booking_date: Date;
  user: number;
  vehicle: number;
};
const token = Cookies.get("NEVESJR_TOKEN");

const getFutureAdminBookings = async () => {
  try {
    const { data } = await api.get<BookingProps[]>(`/booking/future/admin/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao obter as reservas do usuário:", error);
    throw error;
  }
};

const getPastAdminBookings = async () => {
  try {
    const { data } = await api.get<BookingProps[]>(`/booking/past/admin/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao obter as reservas do usuário:", error);
    throw error;
  }
};

const getCanceledAdminBookings = async () => {
  try {
    const { data } = await api.get<BookingProps[]>(`/booking/canceled/admin/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao obter as reservas do usuário:", error);
    throw error;
  }
};

const getPendingAdminBookings = async () => {
  try {
    const { data } = await api.get<BookingProps[]>(`/booking/pending/admin/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao obter as reservas do usuário:", error);
    throw error;
  }
};

const approveBooking = async (bookingId: number) => {
  try {
    const { data } = await api.post(`/booking/approved/${bookingId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao aprovar a reserva do usuário:", error);
    throw error;
  }
};

const postCancelBooking = async (bookingId: number) => {
  try {
    const { data } = await api.post(`/booking/cancel/admin/${bookingId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao cancelar a reserva do usuário:", error);
    throw error;
  }
};

const finishTrip = async (bookingId: number) => {
  try {
    const { data } = await api.post(`/booking/finish/${bookingId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao finalizar a reserva do usuário:", error);
    throw error;
  }
};

export {
  getFutureAdminBookings,
  getPastAdminBookings,
  getCanceledAdminBookings,
  getPendingAdminBookings,
  approveBooking,
  postCancelBooking,
  finishTrip,
};
