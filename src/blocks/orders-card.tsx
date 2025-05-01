import * as React from 'react';
import { cn } from "../lib/utils";

const OrdersCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "w-full max-w-[25rem] rounded-3xl bg-Branding-cardPrimary shadow-[0px_0px_6px_2px_rgba(100,100,100,0.15)] flex flex-col justify-center items-center p-3 gap-3",
            className
        )}
        {...props}
    />
))
OrdersCard.displayName = "OrdersCard"

const OrdersCardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "w-full inline-flex items-start justify-between",
            className
        )}
        {...props}
    />
))
OrdersCardHeader.displayName = "OrdersCardHeader"

const OrdersCardOrderId = React.forwardRef<
HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        className={cn(
            "text-[1rem] leading-[1rem] font-bold font-open-sans text-Branding-textPrimary",
            className
        )}
        {...props}
    />
))
OrdersCardOrderId.displayName = "OrdersCardOrderId"

const OrdersCardDate = React.forwardRef<
HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        className={cn(
            "text-[1rem] leading-[1rem] font-bold font-open-sans text-Branding-textSecondary",
            className
        )}
        {...props}
    />
))
OrdersCardDate.displayName = "OrdersCardDate"

const OrdersCardStore = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn(
            "text-[1rem] leading-[1.25rem] text-Branding-textPrimary font-semibold font-inter",
            className
        )}
        {...props}
    />
))
OrdersCardStore.displayName = "OrdersCardStore"

const OrdersCardAddress = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        className={cn(
            "text-sm text-Branding-textSecondary font-inter",
            className
        )}
        {...props}
    />
))
OrdersCardAddress.displayName = "OrdersCardAddress"

const OrdersCardClientInfo = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "self-start text-left flex items-center justify-center gap-1",
            className
        )}
        {...props}
    />
))
OrdersCardClientInfo.displayName = "OrdersCardClientInfo"

const OrdersCardClientName = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        className={cn(
            "text-sm text-Branding-textSecondary font-inter",
            className
        )}
        {...props}
    />
))
OrdersCardClientName.displayName = "OrdersCardClientName"

const OrdersCardClientNumber = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        className={cn(
            "text-sm text-Branding-textSecondary font-medium font-inter",
            className
        )}
        {...props}
    />
))
OrdersCardClientNumber.displayName = "OrdersCardClientNumber"

export { OrdersCard, OrdersCardHeader, OrdersCardOrderId, OrdersCardDate, 
        OrdersCardStore, OrdersCardAddress, OrdersCardClientInfo, OrdersCardClientName, OrdersCardClientNumber };