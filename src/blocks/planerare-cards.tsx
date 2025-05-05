import * as React from "react";
import { cn } from "../lib/utils"

const PlanerareCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full inline-flex justify-between items-center py-3 border-b border-Branding-textSecondary",
      className
    )}
    {...props}
  />
))
PlanerareCard.displayName = "PlanerareCard"

const PlanerareCardName = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full max-w-[12rem] text-base font-inter text-Branding-textSecondary",
      className
    )}
    {...props}
  />
))
PlanerareCardName.displayName = "PlanerareCardName"

const PlanerareCardAmount = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full max-w-[6rem] text-base font-inter text-Branding-textSecondary",
      className
    )}
    {...props}
  />
))
PlanerareCardAmount.displayName = "PlanerareCardAmount"

export { PlanerareCard, PlanerareCardName, PlanerareCardAmount }