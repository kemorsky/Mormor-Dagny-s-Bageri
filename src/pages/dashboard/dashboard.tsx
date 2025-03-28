import { useRef } from "react";
import {
    WideCard as Card,
    CardDate,
    CardHeader,
    CardAddress,
    CardFooter,
    CardClientName,
    CardClientNumber,
    CardStore,
} from "../../blocks/card";
import customersData from "../../../customers.json";
import { ButtonSecondary, ButtonTertiary } from "./../../components/ui/button";
import Menu from "./../../elements/menu/menu";

type Address = {
    street: string;
    postalCode: string;
    city: string;
};

type Customer = {
    date: string;
    customerNumber: number;
    address: Address;
    name: string;
    storeOwner: string;
    breadManager: string;
    active: boolean;
};

export default function DashBoard() {
    const customers: Customer[] = customersData.customers;
    const previousOrders: Customer[] = customersData.previousOrders;

    // Create ref for two scroll-containers
    const scrollRefCurrent = useRef<HTMLDivElement>(null);
    const scrollRefPrevious = useRef<HTMLDivElement>(null);

    // Scroll-function for current orders
    const scrollLeftCurrent = () => {
        if (scrollRefCurrent.current) {
            scrollRefCurrent.current.scrollBy({ left: -320, behavior: "smooth" });
        }
    };

    const scrollRightCurrent = () => {
        if (scrollRefCurrent.current) {
            scrollRefCurrent.current.scrollBy({ left: 320, behavior: "smooth" });
        }
    };

    // Scroll-function for previous orders
    const scrollLeftPrevious = () => {
        if (scrollRefPrevious.current) {
            scrollRefPrevious.current.scrollBy({ left: -320, behavior: "smooth" });
        }
    };

    const scrollRightPrevious = () => {
        if (scrollRefPrevious.current) {
            scrollRefPrevious.current.scrollBy({ left: 320, behavior: "smooth" });
        }
    };

    return (
        <main className="min-h-[59.75rem] w-full bg-gradient-primary inline-flex flex-col items-center justify-start pt-[3.125rem] relative">
            <Menu />
            {/* Dina pågående beställningar */}
            <div className="w-full inline-flex flex-col items-center justify-center gap-3 mt-5">
                <div className="w-full inline-flex flex-col items-center justify-center gap-3">
                    <article className="w-[380px] flex items-center justify-between">
                        <p className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textPrimary">
                            Dina pågående beställningar
                        </p>
                        <ButtonSecondary>Se alla</ButtonSecondary>
                    </article>

                    {/* Carousel Container for Current Orders */}
                    <div className="relative w-full">
                        {/* Button for left scroll */}
                        <button
                            onClick={scrollLeftCurrent}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 rounded-full z-10"
                        >
                            ←
                        </button>

                        {/* Scrollable container for current orders */}
                        <div
                            ref={scrollRefCurrent}
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                            className="w-full overflow-x-auto scrollbar-hide inline-flex flex-row gap-3 snap-x snap-mandatory scroll-smooth"
                        >
                            {customers.map((customer) => (
                                <div key={customer.customerNumber} className="snap-center min-w-[320px]">
                                    <Card>
                                        <div className="flex justify-between items-center w-full">
                                            <CardClientNumber className="ml-0">{`${customer.customerNumber}`}</CardClientNumber>
                                            <CardDate className="ml-auto">{customer.date}</CardDate>
                                        </div>
                                        <CardHeader>
                                            <CardStore>{customer.name}</CardStore>
                                            <CardAddress>
                                                {customer.address.street} {customer.address.postalCode} {customer.address.city}
                                            </CardAddress>
                                        </CardHeader>
                                        <CardFooter className="flex w-full items-center gap-1">
                                            <CardClientName className="flex-1 truncate">
                                                Butiksägare: {customer.storeOwner}
                                            </CardClientName>
                                            <CardClientName className="flex-1 truncate text-right">
                                                Brödansvarig: {customer.breadManager}
                                            </CardClientName>
                                        </CardFooter>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        {/* Button for right scroll */}
                        <button
                            onClick={scrollRightCurrent}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 rounded-full z-10"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>

            {/* Dina tidigare beställningar */}
            <div className="w-full inline-flex flex-col items-center justify-start gap-3 mt-10">
                <article className="min-w-[380px] flex items-center justify-between">
                    <p className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textPrimary">
                        Dina tidigare beställningar
                    </p>
                    <ButtonTertiary>Se alla</ButtonTertiary>
                </article>

                {/* Carousel Container for Previous Orders */}
                <div className="relative w-full">
                    <button
                        onClick={scrollLeftPrevious}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 rounded-full z-10"
                    >
                        ←
                    </button>

                    <div
                        ref={scrollRefPrevious}
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        className="w-full overflow-x-auto scrollbar-hide inline-flex flex-row gap-3 snap-x snap-mandatory scroll-smooth"
                    >
                        {previousOrders.map((order) => (
                            <div key={order.customerNumber} className="snap-center min-w-[320px]">
                                <Card>
                                    <div className="flex justify-between items-center w-full">
                                        <CardClientNumber className="ml-0">{`#${order.customerNumber}`}</CardClientNumber>
                                        <CardDate className="ml-auto">{order.date}</CardDate>
                                    </div>
                                    <CardHeader>
                                        <CardStore>{order.name}</CardStore>
                                        <CardAddress>
                                            {order.address.street} {order.address.postalCode} {order.address.city}
                                        </CardAddress>
                                    </CardHeader>
                                    <CardFooter className="flex justify-between w-full">
                                        <CardClientName className="ml-0">Butiksägare: {order.storeOwner}</CardClientName>
                                        <CardClientName className="ml-auto">Brödansvarig: {order.breadManager}</CardClientName>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={scrollRightPrevious}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 rounded-full z-10"
                    >
                        →
                    </button>
                </div>
            </div>
        </main>
    );
}