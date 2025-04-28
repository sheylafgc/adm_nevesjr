import { api } from "@/api/api";
import Cookies from "js-cookie";

export type ContactsProps = {
  id: number;
  name: string;
  email: string;
  message: string;
};
const token = Cookies.get("NEVESJR_TOKEN_ADMIN");

export async function getContacts() {
  try {
    const { data } = await api.get<ContactsProps[]>("/contact", {
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
