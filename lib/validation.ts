import { z } from "zod";

export const UserFormValidation = z.object({
    name: z.string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
    email: z.string().email("Please enter a valid email"),
    phone:z.string().refine((phone)=> /^\+?[1-9]\d{1,14}$/.test(phone),{
      message: "Please enter a valid phone number"
    }),
  });
  