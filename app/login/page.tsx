"use client"

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Loader } from "lucide-react";
import Image from "next/image";
import { FormError } from "@/components/form-error";
import { handleFacebookLogin, handleGoogleLogin } from "@/actions/oauth";
import { account } from "@/appwrite.config";

const LoginForm = ({ isOpen }: { isOpen: boolean }) => {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    console.log(values);

    try {
      const user = {
        email: values.email,
        password: values.password,
      };

      const newUser = await account.createEmailPasswordSession(
        user.email,
        user.password
      );
      if (newUser) {
        window.dispatchEvent(new Event("userChange"));
        setError("");
        setIsLoading(false);
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong!");
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="h-screen sm:h-fit flex flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="text-2xl">Login to your account</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} type="email" />
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
                    <FormLabel className="flex justify-between items-center">
                      <p>Password</p>
                      <Button
                        type="button"
                        variant={"link"}
                        className="text-sm font-medium text-indigo-500"
                      >
                        Forgot password?
                      </Button>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader className="h-3 w-3 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-3 text-gray-700 text-sm">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div className="space-y-3">
          <Button
            className="w-full relative"
            onClick={handleGoogleLogin}
            variant={"outline"}
            disabled={isLoading}
          >
            <Image
              src="/assets/icons/googleIcon.svg"
              width={20}
              height={20}
              alt="Google icon"
              className="absolute left-4"
            />
            Continue with Google
          </Button>
          <Button
            className="w-full relative"
            onClick={handleFacebookLogin}
            variant={"outline"}
            disabled={isLoading}
          >
            <Image
              src="/assets/icons/facebookIcon.svg"
              width={20}
              height={20}
              alt="Facebook icon"
              className="absolute left-4"
            />
            Continue with Facebook
          </Button>
        </div>
        {/* <DialogFooter className="bg-[#f7fafc]/80 rounded flex justify-center items-center space-x-2 py-5 text-sm">
          <p>New to MediSearch?</p>
          <Link href={"/register"} className="text-indigo-500 font-semibold">
            Create account
          </Link>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
