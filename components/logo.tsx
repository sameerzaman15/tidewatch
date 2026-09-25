import { cn } from "cn"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="16" cy="16" r="15" className="fill-primary" />
        <path
          d="M6 19.5c2.4-2.6 4-2.6 6.4 0s4 2.6 6.4 0 4-2.6 6.4 0"
          fill="none"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="dark:stroke-[#042F2E]"
        />
        <path
          d="M6 13.5c2.4-2.6 4-2.6 6.4 0s4 2.6 6.4 0 4-2.6 6.4 0"
          fill="none"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.72"
          className="dark:stroke-[#042F2E]"
        />
      </svg>
      <span className="font-heading text-[15px] font-semibold tracking-tight sm:text-base">
        Tidewatch
      </span>
    </span>
  )
}
