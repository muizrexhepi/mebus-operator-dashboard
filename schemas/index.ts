import { z } from "zod"


export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  

  export const citySchema = z.object({
    country: z
      .string()
      .min(2, { message: "Country name must be at least 2 characters long" })
      .max(50, { message: "Country name can't exceed 50 characters" }),
    cityName: z
      .string()
      .min(2, { message: "City name must be at least 2 characters long" })
      .max(50, { message: "City name can't exceed 50 characters" }),
    stationName: z
      .string()
      .min(2, { message: "Station name must be at least 2 characters long" })
      .max(100, { message: "Station name can't exceed 100 characters" }),
    cityCode: z
      .string()
      .min(2, { message: "City code must be at least 2 characters long" })
      .max(20, { message: "City code can't exceed 20 characters" })
      .regex(/^[a-z0-9-]+$/, { message: "City code can only include lowercase letters, numbers, and hyphens" }),
    locationUrl: z
      .string()
      .url({ message: "Location URL must be a valid URL" }),
    stationAddress: z
      .string()
      .min(5, { message: "Station address must be at least 5 characters long" })
      .max(100, { message: "Station address can't exceed 100 characters" }),
  });