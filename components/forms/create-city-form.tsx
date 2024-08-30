"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { FormError } from "@/components/form-error";
import { citySchema } from "@/schemas";
import { API_URL } from "@/environment";
import axios from "axios";
import { toast } from "../ui/use-toast";

export default function CityForm() {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof citySchema>>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      country: "",
      cityName: "",
      stationName: "",
      cityCode: "",
      locationUrl: "",
      stationAddress: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof citySchema>) => {
    setIsLoading(true);
    try {
      if (!values) {
        return;
      }
      console.log({ values });
      const res = await axios.post(`${API_URL}/stations/create/123abc`, {
        name: values.stationName,
        city: values.cityName,
        country: values.country,
        address: values.stationAddress,
        location: values.locationUrl,
        code: values.cityCode,
      });
      console.log({ res });
      setIsLoading(false);
      toast({ description: "Station added succesfully!" });
    } catch (error) {
      console.log(error);
      setError("An error occurred while submitting the form.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Germany"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cityName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Berlin"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Station Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Berlin central bus station"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cityCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="berlin-de"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Google maps station url"
                      type="url"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stationAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Station Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Messedamm 8, 14057 Berlin, Germany"
                    />
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
              "Add City"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
