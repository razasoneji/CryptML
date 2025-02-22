import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="relative group w-full">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "group-hover:border-indigo-500 group-hover:ring-2 group-hover:ring-indigo-500/50", // Hover effect added here
          className
        )}
        {...props}
      />
      {/* Hover gradient effect */}
      <span className="group-hover:opacity-100 opacity-0 transition duration-500 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </div>
  )
}

export { Input }
