import * as React from 'react';
import { cn } from "../lib/utils";

const OrdersCard = React.forwardRef<
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
OrdersCard.displayName = "OrdersCard"

export { OrdersCard };