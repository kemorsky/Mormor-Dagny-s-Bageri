import { useRef } from "react";
import {
    Card,
    CardDate,
    CardHeader,
    CardStore,
    CardAddress,
    CardFooter,
    CardClientName,
    CardClientNumber,
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
    address: Address;
    name: string;
    contactPerson: string;
    customerNumber: number;
    active: boolean;
};

export default function DashBoard() {
    const customers: Customer[] = customersData.customers;
    const previousOrders: Customer[] = customersData.previousOrders;

    // Creates a ref for the carousel
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <main className="min-h-[59.75rem] w-full bg-gradient-primary inline-flex flex-col items-center justify-start pt-[3.125rem] relative">
            <Menu />
            <div className="w-[25.5rem] inline-flex flex-col items-center justify-start gap-6">
                <section className="h-11">icons</section>
                <h1 className="font-open-sans font-bold text-[2rem] leading-[2.75rem] text-Branding-textAccent">
                    Välkommen, Michael!
                </h1>

                {/* Current orders */}
                <div className="w-full inline-flex flex-col items-end justify-center gap-3 mt-5">
                    <div className="w-full inline-flex flex-col items-center justify-center gap-3">
                        <article className="w-[380px] flex items-center justify-between">
                            <p className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textPrimary">
                                Dina pågående beställningar
                            </p>
                            <ButtonSecondary>Se alla</ButtonSecondary>
                        </article>

                        {/* Carousel Container */}
                        <div className="relative w-full">
                            {/* Button left */}
                            <button
                                onClick={scrollLeft}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 rounded-full z-10"
                            >
                                ←
                            </button>

                            {/* Scrollbar-container */}
                            <div
                                ref={scrollRef}
                                style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                }}
                                className="w-full overflow-x-scroll scrollbar-hide inline-flex flex-row gap-5 snap-x snap-mandatory scroll-smooth"
                            >
                                {customers.map((customer) => (
                                    <div key={customer.customerNumber} className="snap-center min-w-[300]">
                                        <Card>
                                            <CardDate>{customer.date}</CardDate>
                                            <CardHeader>
                                                <CardStore>{customer.name}</CardStore>
                                                <CardAddress>
                                                    {customer.address.street} {customer.address.postalCode}{" "}
                                                    {customer.address.city}
                                                </CardAddress>
                                            </CardHeader>
                                            <CardFooter>
                                                <CardClientName>{customer.contactPerson}</CardClientName>
                                                <CardClientNumber>{customer.customerNumber}</CardClientNumber>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                ))}
                            </div>

                            {/* Button for right scroll */}
                            <button
                                onClick={scrollRight}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 rounded-full z-10"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Previous orders */}
            <div className="w-full inline-flex flex-col items-center justify-center gap-3 mt-5">
                <article className="w-[380px] flex items-center justify-between">
                    <p className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textPrimary">
                        Dina tidigare beställningar
                    </p>
                    <ButtonTertiary>Se alla</ButtonTertiary>
                </article>
                <div className="inline-flex items-center justify-center gap-3 py-2">
                    {previousOrders.map((order) => (
                        <Card key={order.customerNumber}>
                            <CardDate>{order.date}</CardDate>
                            <CardHeader>
                                <CardStore>{order.name}</CardStore>
                                <CardAddress>
                                    {order.address.street} {order.address.postalCode} {order.address.city}
                                </CardAddress>
                            </CardHeader>
                            <CardFooter>
                                <CardClientName>{order.contactPerson}</CardClientName>
                                <CardClientNumber>{order.customerNumber}</CardClientNumber>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}