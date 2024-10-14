import { z } from "zod";

export const postValidationSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  category: z
    .string({ required_error: "Category is required" })
    .min(1, { message: "Please select a category" }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(200, { message: "Description cannot exceed 200 characters" }),
});
