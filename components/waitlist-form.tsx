"use client"

import { CheckIcon, Loader2Icon } from "lucide-react"
import { useActionState, useEffect, useRef, useState } from "react"
import { cn } from "cn"

import { waitlistAction } from "@/app/actions/waitlist"
import { whenToasterReady } from "@/components/site-toaster"
import { waitlistInitialState } from "@/lib/waitlist-state"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { waitlistEmailSchema } from "@/lib/schemas"
import { demoEmailNote } from "@/lib/site"

const toasted = new Set<number>()

export function WaitlistForm({
  id,
  tone = "default",
}: {
  id: string
  tone?: "default" | "inverse"
}) {
  const [state, action, pending] = useActionState(waitlistAction, waitlistInitialState)
  const [clientError, setClientError] = useState<string | null>(null)
  const [dismissedId, setDismissedId] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const renderedRef = useRef<HTMLInputElement>(null)
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const done = state.status === "success" && dismissedId !== state.id
  const error = clientError || (state.status === "invalid" ? state.fieldError : undefined)

  useEffect(() => {
    if (renderedRef.current && !renderedRef.current.value) {
      renderedRef.current.value = String(Date.now())
    }
  }, [])

  useEffect(() => {
    if (!state.id || toasted.has(state.id)) return
    toasted.add(state.id)

    void Promise.all([import("sonner"), whenToasterReady()]).then(([{ toast }]) => {
      if (state.status === "success") {
        formRef.current?.reset()
        if (renderedRef.current) renderedRef.current.value = String(Date.now() - 2000)
        toast.success("You're on the list. We'll email you when your invite is ready.", {
          description: demoEmailNote,
        })
      } else if (state.status === "duplicate") {
        toast("You're already on the list.", { description: demoEmailNote })
      } else if (state.status === "rate_limited") {
        toast.error(
          state.message ??
            "Too many attempts from this network. Please wait a few minutes and try again.",
        )
      } else if (state.status === "error") {
        toast.error(state.message ?? "Something went wrong. Please try again in a moment.")
      }
    })
  }, [state])

  return (
    <form
      ref={formRef}
      id={id}
      action={action}
      noValidate
      className="w-full"
      onSubmit={(event) => {
        const email = String(new FormData(event.currentTarget).get("email") ?? "")
        const parsed = waitlistEmailSchema.safeParse(email)
        if (!parsed.success) {
          event.preventDefault()
          if (state.status === "success") setDismissedId(state.id)
          setClientError(parsed.error.issues[0]?.message ?? "Enter a valid email.")
        } else {
          setClientError(null)
        }
      }}
    >
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this field blank
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>
      <input ref={renderedRef} type="hidden" name="rendered_at" defaultValue="" />
      <script
        dangerouslySetInnerHTML={{
          __html:
            '(function(){var form=document.currentScript&&document.currentScript.parentElement;var input=form&&form.querySelector(\'input[name="rendered_at"]\');if(input&&!input.value)input.value=String(Date.now());})();',
        }}
      />
      <Label htmlFor={`${id}-email`} className="sr-only">
        Email
      </Label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            placeholder="you@company.com"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : hintId}
            className={cn(
              "h-11 pr-10",
              tone === "inverse" &&
                "border-white/20 bg-white text-[#0B1220] placeholder:text-slate-500",
            )}
            onChange={() => {
              if (clientError) setClientError(null)
              if (state.status === "success") setDismissedId(state.id)
            }}
          />
          {done ? (
            <CheckIcon
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#0F766E]"
            />
          ) : null}
        </div>
        <Button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className={cn(
            "h-11 w-full sm:w-auto",
            tone === "inverse" &&
              "bg-[#2DD4BF] text-[#042F2E] hover:bg-[#2DD4BF]/90",
          )}
        >
          {pending ? (
            <>
              <Loader2Icon className="animate-spin" />
              Joining
            </>
          ) : (
            "Join the waitlist"
          )}
        </Button>
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <p
          id={hintId}
          className={cn(
            "mt-2 text-sm",
            tone === "inverse" ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {done ? (
            <span className="sr-only">You&apos;re on the list. </span>
          ) : null}
          {demoEmailNote}
        </p>
      )}
    </form>
  )
}
