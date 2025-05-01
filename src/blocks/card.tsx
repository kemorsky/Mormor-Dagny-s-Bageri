import * as React from "react"

import { cn } from "../lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "max-w-[289px] w-full max-h-[200px] h-full px-3 py-3 bg-gradient-card shadow-[0px_0px_6px_2px_rgba(100,100,100,0.15)] rounded-3xl inline-flex flex-col items-end justify-between",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardOrderId = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-left font-open-sans text-[1rem] leading-[1rem] font-bold text-Branding-textPrimary",
      className
    )}
    {...props}
  />
))
CardOrderId.displayName = "CardOrderId"

const CardDate = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-right font-open-sans text-[1rem] leading-[1rem] font-bold text-Branding-textSecondary",
      className
    )}
    {...props}
  />
))
CardDate.displayName = "CardDate"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "self-stretch font-inter space-y-1",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardStore = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-semibold text-[1rem] leading-[19px] text-Branding-textPrimary",
      className
    )}
    {...props}
  />
))
CardStore.displayName = "CardStore"

const CardAddress = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-Branding-textSecondary text-[0.8125rem] leading-[1rem]",
      className
    )}
    {...props}
  />
))
CardAddress.displayName = "CardAddress"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-[106px] font-inter",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const CardClientName = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-[0.8125rem] leading-[1rem] text-Branding-textPrimary",
      className
    )}
    {...props}
  />
))
CardClientName.displayName = "CardClientName"

const CardClientNumber = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-left text-[1rem] leading-[1rem] font-semibold text-Branding-textSecondary",
      className
    )}
    {...props}
  />
))
CardClientNumber.displayName = "CardClientNumber"

const ProductListCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full px-3 py-3 bg-Branding-cardPrimary shadow-[0px_0px_6px_2px_rgba(100,100,100,0.15)] rounded-xl inline-flex flex-col items-start justify-center gap-3",
      className
    )}
    {...props}
  />
))
ProductListCard.displayName = "ProductListCard"

const ProductCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full bg-Branding-cardPrimary inline-flex items-start justify-between text-[0.875rem] leading-[1rem] sm:text-[1rem] sm:leading-[1.1875rem]",
      className
    )}
    {...props}
  />
))
ProductCard.displayName = "ProductCard"

const ProductCardName = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "max-w-[9.25rem] sm:max-w-[11rem] w-full text-Branding-textPrimary font-inter font-semibold",
      className
    )}
    {...props}
  />
))
ProductCardName.displayName = "ProductCardName"

const ProductCardPrice = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "max-w-[3.25rem] sm:max-w-[3.55rem] w-full text-Branding-textSecondary font-inter font-medium",
      className
    )}
    {...props}
  />
))
ProductCardPrice.displayName = "ProductCardPrice"

const ProductCardTotalPrice = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "min-w-[4rem] sm:min-w-[4.75rem] max-w-[5.5rem] flex flex-col text-Branding-textPrimary font-inter font-medium",
      className
    )}
    {...props}
  />
))
ProductCardTotalPrice.displayName = "ProductCardTotalPrice"

const ProductCardAmount = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "max-w-[5rem] text-Branding-textSecondary font-inter font-medium",
      className
    )}
    {...props}
  />
))
ProductCardAmount.displayName = "ProductCardAmount"

// const WideCard = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn(
//       "w-[320px] h-[200px] px-3 py-3 bg-gradient-card shadow-[0px_0px_6px_2px_rgba(100,100,100,0.15)] rounded-3xl inline-flex flex-col items-end justify-between",
//       className
//     )}
//     {...props}
//   />
// ));
// WideCard.displayName = "WideCard";

export {Card, CardOrderId, CardDate, CardHeader, CardStore, CardAddress, CardFooter, CardClientName, CardClientNumber, ProductListCard, ProductCard, ProductCardName, ProductCardPrice, ProductCardTotalPrice, ProductCardAmount }


// export default function Card() {
//     return (
//         <div className="w-[190px] h-[190px] px-1.5 py-3 bg-gradient-card shadow-[0px_0px_6px_2px_rgba(100,100,100,0.15)] rounded-3xl inline-flex flex-col items-end justify-between">
//             <p className="self-stretch text-right text-[0.8125rem] leading-[0.8125rem] text-white/80">om 1-3 dagar</p>
//             <article className="self-stretch font-inter space-y-1">
//                 <h2 className="font-semibold text-[1rem] leading-19px]">ICA Bollebygd</h2>
//                 <p className="text-Branding-textSecondary text-[0.8125rem] leading-[1rem]">Långgatan 18, Kållered</p>
//             </article>
//             <article className="w-[106px] font-inter space-y-1">
//                 <h2 className="text-[0.8125rem] leading-[1rem]">Stefan Holmqvist</h2>
//                 <p className="text-Branding-textSecondary text-[0.8125rem] leading-[1rem]">076 367 826</p>
//             </article>
//         </div>
//     )
// };