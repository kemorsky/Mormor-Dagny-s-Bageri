import * as React from "react"

import { cn } from "../lib/utils"

const CardStore = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full min-h-[8.5rem] flex flex-col items-start justify-start p-3 bg-Branding-cardPrimary shadow-[0px_0px_6px_2px_rgba(100,100,100,0.15)] rounded-xl",
      className
    )}
    {...props}
  />
))
CardStore.displayName = "CardStore"

const CardStoreContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "self-stretch h-full w-full inline-flex flex-col items-start justify-center gap-6",
      className
    )}
    {...props}
  />
))
CardStoreContent.displayName = "CardStoreContent"

const CardStoreInformation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full inline-flex flex-col justify-start items-start gap-1.5",
      className
    )}
    {...props}
  />
))
CardStoreInformation.displayName = "CardStoreInformation"

const CardStoreContacts = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full inline-flex flex-col justify-start items-start gap-1.5",
      className
    )}
    {...props}
  />
))
CardStoreContacts.displayName = "CardStoreContacts"

const CardStoreOwner = React.forwardRef<
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
CardStoreOwner.displayName = "CardStoreOwner"

const CardStoreBreadperson = React.forwardRef<
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
CardStoreBreadperson.displayName = "CardStoreBreadperson"

const CardProduct = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full inline-flex justify-between items-center",
      className
    )}
    {...props}
  />
))
CardProduct.displayName = "CardProduct"

export { CardStore, CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson, CardProduct }