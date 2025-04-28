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
import { ButtonSecondary, ButtonTertiary } from "./../../components/ui/button";
import Menu from "./../../elements/menu/menu";
import { fetchSpecificOrder } from "../../lib/api";
import { useFilteredOrders } from "../../hooks/useFilteredOrders";
import { useNavigate } from "react-router";
import { formatDate } from "../../lib/formatDate";
import { formatPhoneNumber } from "../../lib/formatPhoneNumber";

export default function DashBoard() {
    const { upcoming, previous } = useFilteredOrders();

    const scrollRefCurrent = useRef<HTMLDivElement>(null);
    const scrollRefPrevious = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const handleClick = async (BeställningId: number) => {
        try {
            const selectedOrder = await fetchSpecificOrder(BeställningId)
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
        <main className="w-full min-h-screen inline-flex flex-col items-center justify-start bg-Branding-backgroundPrimary px-4">
            <div className="max-w-[60rem] w-full inline-flex flex-col items-center justify-start gap-6 py-4">

            <Menu />
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
                                <div key={order.BeställningId} onClick={() => { handleClick(order.BeställningId ?? 0) }} className="snap-center min-w-[320px]">
                                    <Card>
                                        <div className="flex justify-between items-center w-full">
                                            <CardClientNumber>#{order.BeställningId}</CardClientNumber>
                                            <CardDate>
                                                {formatDate(order.PreliminärtLeveransdatum)}
                                            </CardDate>
                                        </div>
                                        <CardHeader>
                                            <CardStore>{order.Butik?.ButikNamn}</CardStore>
                                            <CardAddress className="font-normal text-sm overflow-hidden flex flex-col">
                                                <span>{order.Butik?.Besöksadress}</span>
                                            </CardAddress>
                                        </CardHeader>
                                        <CardFooter className="flex justify-between w-full items-center">
                                            <div className="flex-1 min-w-0 flex flex-col">
                                                <span className="text-sm">Butiksägare</span>
                                                <CardClientName className="text-sm text-[#9A9A9A]">
                                                    <span>{order.Butik?.ButikschefNamn}</span>
                                                </CardClientName>
                                                <CardClientName className="text-sm text-[#9A9A9A]">
                                                    <span>{formatPhoneNumber(order.Butik?.ButikschefTelefon ?? '')}</span>
                                                </CardClientName>
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col text-right">
                                                <span className="text-sm">Brödansvarig</span>
                                                <CardClientName className="text-sm text-[#9A9A9A]">
                                                    <span>{order.Butik?.BrödansvarigNamn}</span>
                                                </CardClientName>
                                                <CardClientName className="text-sm text-[#9A9A9A]">
                                                    <span>{formatPhoneNumber(order.Butik?.BrödansvarigTelefon ?? '')}</span>
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
                        {/* Scroll Left Button */}
                        <button
                            onClick={() => scrollLeft(scrollRefPrevious)}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 rounded-full z-10 text-white"
                        >
                            ←
                        </button>

                        {/* Scrollable Card Container */}
                        <div
                            ref={scrollRefPrevious}
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            className="w-full overflow-x-auto scrollbar-hide inline-flex flex-row gap-3 snap-x snap-mandatory scroll-smooth"
                        >
                            {previous.map((order) => (
                                <div
                                    key={order.BeställningId}
                                    onClick={() => handleClick(order.BeställningId ?? 0)}
                                    className="snap-center"
                                >
                                    <div className="w-44 h-36 p-3 bg-gradient-to-br from-neutral-800 to-zinc-900 rounded-3xl shadow-[0px_0px_6px_2px_rgba(100,100,100,0.15)] inline-flex flex-col justify-start items-start gap-3 overflow-hidden cursor-pointer">
                                        {/* Order ID and Date */}
                                        <div className="w-full flex justify-between items-center">
                                            <span className="text-white text-sm font-semibold font-['Inter']">
                                                #{order.BeställningId}
                                            </span>
                                            <span className="text-Customs-Text-Secondary text-sm font-normal font-['Inter']">
                                                {(() => {
                                                    const d = new Date(order.PreliminärtLeveransdatum);
                                                    const day = String(d.getDate()).padStart(2, "0");
                                                    const month = String(d.getMonth() + 1).padStart(2, "0");
                                                    const year = d.getFullYear();
                                                    return `${day}.${month}.${year}`;
                                                })()}
                                            </span>
                                        </div>

                                        {/* Store & Contact Info */}
                                        <div className="h-20 flex flex-col justify-center items-start gap-1.5 mt-2">
                                            <div className="w-32 text-white text-base font-semibold font-['Inter']">
                                                {order.Butik?.ButikNamn}
                                            </div>
                                            <div className="text-white text-sm font-normal font-['Inter']">
                                                Butikägare
                                            </div>
                                            <div className="text-[#9A9A9A] text-sm font-normal font-['Inter']">
                                                {order.Butik?.ButikschefNamn}
                                            </div>
                                            <div className="text-[#9A9A9A] text-sm font-normal font-['Inter']">
                                                {order.Butik?.ButikschefTelefon?.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{0,3})/, "$1 $2 $3").trim()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Scroll Right Button */}
                        <button
                            onClick={() => scrollRight(scrollRefPrevious)}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 rounded-full z-10 text-white"
                        >
                            →
                        </button>
                    </div>
                </div>
            
            </div>
        </main>
    );
}