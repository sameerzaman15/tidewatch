import type { WaitlistResult } from "@/lib/waitlist"

export type WaitlistFormState = WaitlistResult & { id: number }

export const waitlistInitialState: WaitlistFormState = {
  status: "idle",
  id: 0,
}
