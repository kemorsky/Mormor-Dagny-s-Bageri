import * as React from "react"

import { cn } from "../lib/utils"

const CardStore = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full min-h-[8.5rem] flex flex-col items-start justify-start p-3 bg-Branding-cardPrimary shadow-[0px_0px_8px_4px_rgba(180,180,180,0.15)] rounded-xl",
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

const PreviousOrderCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-[10.75rem] h-[10.75rem] z-index-50 relative p-3 bg-[#242c3b] shadow-[0px_0px_8px_4px_rgba(180,180,180,0.06)] rounded-3xl inline-flex flex-col justify-start items-start gap-3 cursor-pointer",
      className
    )}
    {...props}
  />
))
PreviousOrderCard.displayName = "PreviousOrderCard"

const PreviousOrderCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full flex justify-between items-center",
      className
    )}
    {...props}
  />
))
PreviousOrderCardHeader.displayName = "PreviousOrderCardHeader"

const PreviousOrderCardHeaderId = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "text-Branding-textPrimary text-[1rem] leading-[1rem] font-bold font-open-sans",
      className
    )}
    {...props}
  />
))
PreviousOrderCardHeaderId.displayName = "PreviousOrderCardHeaderId"

const PreviousOrderCardHeaderDate = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "text-Branding-textSecondary text-[1rem] leading-[1rem] font-bold font-open-sans",
      className
    )}
    {...props}
  />
))
PreviousOrderCardHeaderDate.displayName = "PreviousOrderCardHeaderDate"

const PreviousOrderCardContact = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <article
    ref={ref}
    className={cn(
      "min-h-20 h-full flex flex-col justify-between items-start gap-2",
      className
    )}
    {...props}
  />
))
PreviousOrderCardContact.displayName = "PreviousOrderCardContact"

const PreviousOrderCardContactStore = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "w-full text-Branding-textPrimary text-base font-semibold font-inter",
      className
    )}
    {...props}
  />
))
PreviousOrderCardContactStore.displayName = "PreviousOrderCardContactStore"

const PreviousOrderCardData = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <article
    ref={ref}
    className={cn(
      "text-sm space-y-2 font-normal font-inter",
      className
    )}
    {...props}
  />
))
PreviousOrderCardData.displayName = "PreviousOrderCardData"


export { CardStore, CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson, CardProduct,
         PreviousOrderCard, PreviousOrderCardHeader, PreviousOrderCardHeaderId, PreviousOrderCardHeaderDate, PreviousOrderCardContact,
          PreviousOrderCardContactStore, PreviousOrderCardData }