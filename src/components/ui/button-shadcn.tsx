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
          "w-40 px-4 py-2 font-DMSans transition-colors",
      },
      active: {
        true: "bg-black text-Branding-textPrimary font-semibold",
        false:
          "bg-[#898989] text-Branding-textPrimary hover:text-Branding-textAccent",
      },
      size: {
        default: "min-w-[14.5rem] px-4 py-2",
        smaller: "max-w-[10rem] px-4 py-2",
        admin: "min-w-[5.135rem] px-4 py-2",
        lg: "h-10 rounded-md px-8",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isActive, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, active: isActive, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
