import { z } from "zod";

export const FormDataSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(5, "First name is required minimum of 5 letters"),
  lastName: z.string().trim().min(1, "Last name is required"),
  imgUrl: z.string().min(1, "Image required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  country: z.string().trim().min(1, "Country is required"),
  street: z.string().trim().min(1, "Street is required"),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().min(1, "State is required"),
  zip: z
    .string()
    .trim()
    .min(1, "Zip is required")
    .regex(
      new RegExp("^[0-9]{6}(?:-[0-9]{4})?$"),
      "InValid Zip Code should of 6 digit long"
    ),
  companyName: z.string().trim().min(1, "Company Name is required"),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone Number is Required")
    .max(10, "Phone Number should 10 digit long only")
    .regex(new RegExp("^\\d{10}$"), "Invalid Phone number"),
});
