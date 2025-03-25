import { api } from "@/api/api";
import Cookies from "js-cookie";

export type PartnersProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  car_model: string;
};
const token = Cookies.get("NEVESJR_TOKEN");

export async function getPartners() {
  try {
    const { data } = await api.get<PartnersProps[]>("/be-partner", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
