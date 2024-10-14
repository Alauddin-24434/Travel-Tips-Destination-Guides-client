import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .min(1, "Password needs to be at lest 1 character"),
});

export const forgetPasswordValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
});

export const resetPasswordValidationSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const userUpdateValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  mobileNumber: z
    .string()
    .min(10, { message: "Mobile number must be at least 10 digits" })
    .max(15, { message: "Mobile number cannot exceed 15 digits" })
    .regex(/^[0-9]+$/, {
      message: "Mobile number should contain only digits",
    }),
  address: z.string().optional(),
  bio: z.string().optional(),
});


export const registerValidationSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),

    gender: z.string().min(1, { message: "Gender is required" }),

    email: z.string().email({ message: "Invalid email address" }),

    mobileNumber: z
      .string()
      .min(10, { message: "Mobile number must be at least 10 digits" })
      .max(15, { message: "Mobile number cannot exceed 15 digits" })
      .regex(/^[0-9]+$/, {
        message: "Mobile number should contain only digits",
      }),

    birthDate: z
      .object({
        calendar: z.object({
          identifier: z.string(),
        }),
        era: z.string(),
        year: z.number().min(1900, { message: "Year must be valid" }),
        month: z
          .number()
          .min(1)
          .max(12, { message: "Month must be between 1 and 12" }),
        day: z
          .number()
          .min(1)
          .max(31, { message: "Day must be between 1 and 31" }),
      })
      .refine(
        (data) => {
          const { year, month, day } = data;
          const isValidDate = !isNaN(new Date(year, month - 1, day).getTime());

          return isValidDate;
        },
        { message: "Invalid birth date" },
      ),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),

    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),

    // Add profileImage validation
    profileImage: z
      .instanceof(File)
      .optional()
      .refine((file) => {
        if (file) {
          const validTypes = [
            "image/jpeg",  // JPEG images
            "image/png",   // PNG images
            "image/gif",   // GIF images
            "image/webp",  // WebP images
            "image/bmp",   // BMP images
            "image/tiff",  // TIFF images
            "image/svg+xml" // SVG images
          ];
          return validTypes.includes(file.type);
        }
        return true; // If no file is provided, it's valid since it's optional
      }, {
        message: "Profile image must be a valid image file (jpg, png, gif, webp, bmp, tiff, svg)",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });


export const changePasswordValidationSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
