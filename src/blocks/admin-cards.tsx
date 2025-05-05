import * as React from "react"
import { cn } from "../lib/utils"

const AdminUserCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "max-w-[25.5rem] w-full min-h-[8.5rem] flex flex-col items-start justify-start gap-3 p-3 bg-Branding-cardPrimary shadow-[0px_0px_8px_4px_rgba(180,180,180,0.12)] rounded-xl",
      className
    )}
    {...props}
  />
))
AdminUserCard.displayName = "AdminUserCard"

const AdminUserCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "self-stretch h-full w-full inline-flex flex-col items-start justify-center gap-2.5",
      className
    )}
    {...props}
  />
))
AdminUserCardContent.displayName = "AdminUserCardContent"

const AdminUserCardInformation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "self-stretch inline-flex flex-col justify-start items-start gap-1.5",
      className
    )}
    {...props}
  />
))
AdminUserCardInformation.displayName = "AdminUserCardInformation"

const AdminUserCardContacts = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex flex-col justify-start items-start gap-1.5",
      className
    )}
    {...props}
  />
))
AdminUserCardContacts.displayName = "AdminUserCardContacts"

const AdminUserCardOwner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full inline-flex justify-start items-center gap-1.5",
      className
    )}
    {...props}
  />
))
AdminUserCardOwner.displayName = "AdminUserCardOwner"

const AdminUserCardBreadperson = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full inline-flex justify-start items-center gap-1.5",
      className
    )}
    {...props}
  />
))
AdminUserCardBreadperson.displayName = "AdminUserCardBreadperson"

export {AdminUserCard, AdminUserCardContent, AdminUserCardInformation, AdminUserCardContacts, AdminUserCardOwner, AdminUserCardBreadperson}