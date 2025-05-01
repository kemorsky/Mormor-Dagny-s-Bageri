import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 font-DMSans font-bold whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-Branding-buttonPrimary hover:bg-Branding-buttonPrimary/80 border border-Branding-textAccent text-Branding-textAccent",
        proceed:
          "bg-Branding-buttonProceed hover:bg-[#F0C93D] text-[#1E2124] border border-[#1E2124]",
        manage:
          "text-emerald-300 hover:text-Branding-textPrimary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-emerald-600 hover:bg-emerald-700",
        delete:
          "text-red-200 hover:text-Branding-textPrimary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-red-400 hover:bg-red-500",
        tab:
          "w-40 rounded-none border border-Branding-buttonProceed shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]",
        prev:
          "rounded-lg font-DMSans transition-colors hover:text-gray-500",
        next: 
          "rounded-lg font-DMSans transition-colors hover:text-gray-500",
        pageNumber: "items-center px-4 py-2 mx-1 transition-colors rounded-md sm:flex hover:text-Branding-textSecondary"
      },
      active: {
        true: "bg-Branding-buttonProceed text-[#1E2124] font-bold",
        false: "bg-Branding-buttonPrimary text-Branding-buttonProceed hover:text-Branding-textAccent",
      },
      disabled: {
        true: "bg-gray-700 text-Branding-textSecondary font-semibold",
        false: "bg-sky-600 hover:text-gray-500 text-Branding-textPrimary hover:text-Branding-textSecondary"
      },
      size: {
        default: "min-w-[14.5rem] px-4 py-2",
        smaller: "max-w-[10rem] px-4 py-2",
        admin: "min-w-[5.135rem] px-4 py-2",
        pagination: "h-10 w-10 p-2",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isActive?: boolean
  disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isActive, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, active: isActive, disabled: props.disabled, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
