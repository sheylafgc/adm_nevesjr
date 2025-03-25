import { api } from "@/api/api";

export type ContactsProps = {
  id: number;
  name: string;
  email: string;
  message: string;
};

export async function getContacts() {
  try {
    const { data } = await api.get<ContactsProps[]>("/contact");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
