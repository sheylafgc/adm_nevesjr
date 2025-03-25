"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "./LoginSchema";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { ClipLoader } from "react-spinners";

export default function LoginPage() {
  const { signIn, loading } = useContext(AuthContext);
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: LoginSchemaType) {
    await signIn(data);
    form.reset();
  }
  return (
    <div className="w-full h-auto py-32 flex justify-center items-center lg:bg-white bg-white">
      <div className="lg:w-auto w-full justify-center items-center flex flex-col lg:bg-white2 lg:px-40 px-10 py-10 rounded-xl lg:shadow-md">
        <div className="flex flex-col justify-between items-center gap-10 ">
          <h1 className="font-ppMonument text-3xl text-black">Log in</h1>
          <div className="w-full h-[2px] bg-gray1" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mx-28 flex justify-center items-center"
            >
              <div className="space-y-8 w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email address"
                          className="bg-white lg:py-0 py-7"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PasswordInput
                          placeholder="Password"
                          className="bg-white lg:py-0 py-7"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={!form.formState.isValid || loading}
                  className="rounded-full w-full lg:py-0 py-7"
                  type="submit"
                >
                  {loading ? (
                    <ClipLoader size={20} className="text-white" />
                  ) : (
                    "Log in"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
