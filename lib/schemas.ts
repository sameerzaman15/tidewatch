import { z } from "zod"

export const waitlistEmailSchema = z
  .string()
  .trim()
  .min(1, "Enter your email.")
  .max(254, "Email must be 254 characters or fewer.")
  .email("Enter a valid email.")

export const teamSizes = [
  { value: "1", label: "Just me" },
  { value: "2-10", label: "2 to 10" },
  { value: "11-20", label: "11 to 20" },
  { value: "21-50", label: "21 to 50" },
  { value: "51+", label: "51 or more" },
] as const

const teamSizeValues = teamSizes.map((size) => size.value) as [
  (typeof teamSizes)[number]["value"],
  ...(typeof teamSizes)[number]["value"][],
]

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(80, "Name must be 80 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your work email.")
    .max(254, "Email must be 254 characters or fewer.")
    .email("Enter a valid work email."),
  company: z
    .string()
    .trim()
    .min(2, "Enter your company.")
    .max(80, "Company must be 80 characters or fewer."),
  teamSize: z.enum(teamSizeValues, { message: "Select a team size." }),
  message: z
    .string()
    .trim()
    .min(10, "Add a short note (at least 10 characters).")
    .max(2000, "Message must be 2000 characters or fewer."),
})

export type ContactInput = z.infer<typeof contactSchema>
