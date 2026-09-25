"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"

import { contactAction } from "@/app/actions/contact"
import { whenToasterReady } from "@/components/site-toaster"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { contactSchema, teamSizes, type ContactInput } from "@/lib/schemas"
import { demoEmailNote } from "@/lib/site"

export function ContactForm() {
  const renderedRef = useRef<HTMLInputElement>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      teamSize: undefined,
      message: "",
    },
  })

  useEffect(() => {
    if (renderedRef.current && !renderedRef.current.value) {
      renderedRef.current.value = String(Date.now())
    }
  }, [])

  return (
    <Form {...form}>
      <form
        className="grid gap-5"
        noValidate
        onSubmit={(event) => {
          const data = new FormData(event.currentTarget)
          const honeypot = String(data.get("company_website") ?? "")
          const renderedAt = String(data.get("rendered_at") ?? "")
          void form.handleSubmit(async (values) => {
            const result = await contactAction({
              values,
              honeypot,
              renderedAt,
            })
            if (result && !result.ok) {
              const [{ toast }] = await Promise.all([import("sonner"), whenToasterReady()])
              toast.error(result.message)
            }
          })(event)
        }}
      >
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Leave this field blank
            <input ref={honeypotRef} type="text" name="company_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <input ref={renderedRef} type="hidden" name="rendered_at" defaultValue="" />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" inputMode="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input autoComplete="organization" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team size</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent position="popper">
                  {teamSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={5} className="min-h-32" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm text-muted-foreground">{demoEmailNote}</p>
        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full sm:w-fit">
          {form.formState.isSubmitting ? (
            <>
              <Loader2Icon className="animate-spin" />
              Sending
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </form>
    </Form>
  )
}
