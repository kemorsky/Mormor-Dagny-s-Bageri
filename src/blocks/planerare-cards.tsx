import * as React from "react";
import { cn } from "../lib/utils"

const PlanerareCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full inline-flex justify-between items-center p-3 border-b border-black",
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
      "text-base font-semibold font-inter text-Branding-textPrimary ",
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
      "",
      className
    )}
    {...props}
  />
))
PlanerareCardAmount.displayName = "PlanerareCardAmount"

export { PlanerareCard, PlanerareCardName, PlanerareCardAmount }