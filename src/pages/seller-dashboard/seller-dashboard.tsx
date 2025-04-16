import { useRef, useState, useEffect } from "react";
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
import { ButtonSecondary, ButtonTertiary } from "./../../components/ui/button";
import Menu from "./../../elements/menu/menu";
import { fetchUpcomingDeliveries, fetchSpecificOrder } from "../../lib/api";
import { Order } from "../../types/types";
import { useNavigate } from "react-router";

export default function DashBoard() {
    const [previousOrders, setPreviousOrders] = useState<Customer[]>([]);
    const [upcoming, setUpcoming] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const scrollRefCurrent = useRef<HTMLDivElement>(null);
    const scrollRefPrevious = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getUpcomingDeliveries = async () => {
            try {
                const upcomingDeliveries = await fetchUpcomingDeliveries();
                console.log(upcomingDeliveries)
                setUpcoming(upcomingDeliveries);
            } catch (error) {
                console.error("Error fetching upcoming deliveries:", error);
            }
        }
        getUpcomingDeliveries();
    }, [])

    const handleClick = async (BeställningId: number) => {
        try {
            const selectedOrder = await fetchSpecificOrder(BeställningId)
            console.log(selectedOrder.BeställningId)
            navigate(`/order/${selectedOrder.BeställningId}`)
        } catch (error) {
            console.error("Error fetching this order:", error)
        }
    }

     // Scrollfunktioner
    const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollBy({ left: -320, behavior: "smooth" });
    };

    const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollBy({ left: 320, behavior: "smooth" });
    };

    return (
        <main className="min-h-[59.75rem] w-full bg-gradient-primary inline-flex flex-col items-center justify-start pt-[3.125rem] relative">
            <Menu />
                <>
                    {/* Pågående beställningar */}
                    <div className="w-full inline-flex flex-col items-center justify-center gap-3 mt-5">
                        <article className="w-[380px] flex items-center justify-between">
                            <p className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textPrimary">
                                Dina pågående beställningar
                            </p>
                            <ButtonSecondary>Se alla</ButtonSecondary>
                        </article>

                        <div className="relative w-full">
                            <button
                                onClick={() => scrollLeft(scrollRefCurrent)}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 rounded-full z-10"
                            >
                                ←
                            </button>

                            <div
                                ref={scrollRefCurrent}
                                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                className="w-full overflow-x-auto scrollbar-hide inline-flex flex-row gap-3 snap-x snap-mandatory scroll-smooth"
                            >
                                {upcoming.map((order) => (
                                    <div key={order.BeställningId} onClick={() => {handleClick(order.BeställningId)}} className="snap-center min-w-[320px]">
                                        <Card>
                                            <div className="flex justify-between items-center w-full">
                                                <CardClientNumber className="ml-0 text-lg font-bold">#{order.BeställningId}</CardClientNumber>
                                                <CardDate className="ml-auto text-lg font-bold">{order.PreliminärtLeveransdatum}</CardDate>
                                            </div>
                                            <CardHeader>
                                                <CardStore>{order.Butik?.ButikNamn}</CardStore>
                                                <CardAddress className="font-normal text-sm overflow-hidden flex flex-col">
                                                    <span>{order.Butik?.Besöksadress}</span>
                                                </CardAddress>
                                            </CardHeader>
                                            <CardFooter className="flex justify-between w-full items-center">
                                                <div className="flex-1 min-w-0 flex flex-col">
                                                    <span>Butiksägare</span>
                                                    <CardClientName className="text-sm text-[#9A9A9A]">
                                                        <span>{order.Butik?.ButikschefNamn}</span>
                                                    </CardClientName>
                                                    <CardClientName className="text-sm text-[#9A9A9A]">
                                                        <span>{order.Butik?.ButikschefTelefon}</span>
                                                    </CardClientName>
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-col text-right">
                                                    <span>Brödansvarig</span>
                                                    <CardClientName className="text-sm text-[#9A9A9A]">
                                                        <span>{order.Butik?.BrödansvarigNamn}</span>
                                                    </CardClientName>
                                                    <CardClientName className="text-sm text-[#9A9A9A]">
                                                        <span>{order.Butik?.BrödansvarigTelefon}</span>
                                                    </CardClientName>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => scrollRight(scrollRefCurrent)}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 rounded-full z-10"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    {/* Tidigare beställningar */}
                    <div className="w-full inline-flex flex-col items-center justify-start gap-3 mt-10">
                        <article className="min-w-[380px] flex items-center justify-between">
                            <p className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textPrimary">
                                Dina tidigare beställningar
                            </p>
                            <ButtonTertiary>Se alla</ButtonTertiary>
                        </article>

                        <div className="relative w-full">
                            <button
                                onClick={() => scrollLeft(scrollRefPrevious)}
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
                                                <CardClientNumber className="ml-0 text-lg font-bold">{`#${order.customerNumber}`}</CardClientNumber>
                                                <CardDate className="ml-auto text-lg font-bold">{order.date}</CardDate>
                                            </div>
                                            <CardHeader>
                                                <CardStore>{order.name}</CardStore>
                                                <CardAddress className="font-normal text-sm overflow-hidden flex flex-col">
                                                    <span>{order.address.street}</span>
                                                    <span>{order.address.postalCode} {order.address.city}</span>
                                                </CardAddress>
                                            </CardHeader>
                                            <CardFooter className="flex justify-between w-full items-center">
                                                <div className="flex-1 min-w-0 flex flex-col">
                                                    <span>Butiksägare</span>
                                                    <CardClientName className="text-sm text-[#9A9A9A]">
                                                        <span>{order.contactPerson || "Ej angiven"}</span>
                                                    </CardClientName>
                                                    <CardClientName className="text-sm text-[#9A9A9A]">
                                                        <span>{order.phoneNumber}</span>
                                                    </CardClientName>
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-col text-right">
                                                    <span>Brödansvarig</span>
                                                    <CardClientName className="text-sm text-[#9A9A9A]">
                                                        <span>{order.breadManager || "Ej angiven"}</span>
                                                    </CardClientName>
                                                    <CardClientName className="text-sm text-[#9A9A9A]">
                                                        <span>{order.phoneNumber}</span>
                                                    </CardClientName>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => scrollRight(scrollRefPrevious)}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 rounded-full z-10"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </>
        </main>
    );
}