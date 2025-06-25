import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "default" | "forms"
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default",...props }, ref) => {
    const variantClassNames = {
      default: "h-14 bg-background text-2xl font-normal",
      forms: "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    }

    return (
      <input
        type={type}
        className={cn(
          " placeholder:text-theme-bg disabled:opacity-50 w-full",
          variantClassNames[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
