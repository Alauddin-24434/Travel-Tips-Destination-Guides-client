import { z } from "zod";

const signupValidationSchema = z.object({
  username: z.string().min(1, "Please enter your user Name!"),
  email: z.string().email("Please enter a valid email address!"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select your gender",
  }),
  password: z.string().min(1, "Must be at least 1 characters."),
});

export default signupValidationSchema;