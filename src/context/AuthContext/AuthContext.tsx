/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { api } from "@/api/api";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LoginSchemaType } from "@/app/auth/Login/LoginSchema";
import { Bounce, toast } from "react-toastify";

type AuthProviderProps = {
  children: ReactNode;
};

type UserProps = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  title: "Mr" | "Ms";
  is_staff: boolean;
};

type AuthContextData = {
  user: UserProps | null;
  signIn: (data: LoginSchemaType, isOnBookATrip?: boolean) => Promise<void>;
  signOut: () => void;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(true);
  const router = useRouter();

  const token = Cookies.get("NEVESJR_TOKEN");
  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      getProfile();
    }
  }, [refresh, token]);

  async function signIn(form: LoginSchemaType) {
    setLoading(true);
    try {
      const { data } = await api.post("/login/", form);
      api.defaults.headers.Authorization = `Bearer ${data.access}`;
      Cookies.set("NEVESJR_TOKEN", data.access, { expires: 1 });
      getProfile();
      toast.success("Login successful", {
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
      setRefresh(!refresh);
    } catch (error) {
      let errorMessage = "An error occurred.";

      if (
        error instanceof Error &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response
      ) {
        errorMessage =
          (error.response as { data: { detail?: string } }).data.detail ||
          errorMessage;
      } else {
        if (error instanceof Error) {
          errorMessage = error.message;
        }
      }
      toast.error(errorMessage, {
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
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      setUser(null);
      Cookies.remove("NEVESJR_TOKEN");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred", {
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
    }
  }

  async function getProfile() {
    try {
      if (token) {
        const { data } = await api.get<UserProps>("/user/profile");

        if (!data.is_staff) {
          setUser(null);
          Cookies.remove("NEVESJR_TOKEN");
          delete api.defaults.headers.Authorization;

          toast.error("Access restricted to administrators", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

          router.push("/auth/login");
          return;
        }

        setUser(data);
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      signOut();
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
