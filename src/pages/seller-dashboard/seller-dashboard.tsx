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
import Menu from "./../../elements/menu/menu";
import { useFilteredOrdersSeller } from "../../hooks/useFilteredOrdersSeller";
import { formatDate } from "../../lib/formatDate";
import { formatPhoneNumber } from "../../lib/formatPhoneNumber";
import { Main, Wrapper } from "../../blocks/wrappers";
import { PreviousOrderCard, PreviousOrderCardHeader, PreviousOrderCardHeaderId, PreviousOrderCardHeaderDate, PreviousOrderCardContact, PreviousOrderCardContactStore, PreviousOrderCardData } from "../../blocks/card-order-page";

export default function DashBoard() {
    const { upcoming, previous } = useFilteredOrdersSeller();

    const scrollRefCurrent = useRef<HTMLDivElement>(null);
    const scrollRefPrevious = useRef<HTMLDivElement>(null);

    // Scrollfunktioner
    const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollBy({ left: -320, behavior: "smooth" });
    };

    const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollBy({ left: 320, behavior: "smooth" });
    };

    return (
        <Main>
            <Wrapper>
                <Menu />
                {/* Pågående beställningar */}
                <div className="w-full max-w-[50rem] inline-flex flex-col items-start justify-center gap-3">
                    <h2 className="self-start text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Dina pågående beställningar</h2>
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
                            className="w-full overflow-x-auto no-scrollbar inline-flex gap-3 snap-x snap-mandatory scroll-smooth"
                        >
                            {upcoming.map((order) => (
                                <a href={`/order/${order.BeställningId}`} key={order.BeställningId} className="snap-center min-w-[320px] cursor-pointer">
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
                                </a>
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
                <div className="w-full max-w-[50rem] inline-flex flex-col items-center justify-start gap-3 mt-10">
                    <h2 className="self-start text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Dina tidigare beställningar</h2>
                    <div className="relative w-full ">
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
                            className="w-full overflow-x-auto no-scrollbar inline-flex gap-3 snap-x snap-mandatory scroll-smooth"
                        >
                            {previous.map((order) => (
                                <a href={`/order/${order.BeställningId}`} key={order.BeställningId}>
                                    <PreviousOrderCard className="snap-center">
                                        <PreviousOrderCardHeader>
                                            <PreviousOrderCardHeaderId>#{order.BeställningId}</PreviousOrderCardHeaderId>
                                            <PreviousOrderCardHeaderDate>
                                                {(() => {
                                                    const d = new Date(order.PreliminärtLeveransdatum);
                                                    const day = String(d.getDate()).padStart(2, "0");
                                                    const month = String(d.getMonth() + 1).padStart(2, "0");
                                                    const year = d.getFullYear();
                                                    return `${day}.${month}.${year}`;
                                                })()}
                                            </PreviousOrderCardHeaderDate>
                                        </PreviousOrderCardHeader>
                                        <PreviousOrderCardContact>
                                            <PreviousOrderCardContactStore>{order.Butik?.ButikNamn}</PreviousOrderCardContactStore>
                                            <PreviousOrderCardData>
                                                <p className="text-Branding-textPrimary">Brödansvarig:</p>
                                                <span className="text-Branding-textSecondary">
                                                    <p>{order.Butik?.BrödansvarigNamn}</p>
                                                    <p>{order.Butik?.ButikschefTelefon?.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{0,3})/, "$1 $2 $3").trim()}</p>
                                                </span>
                                            </PreviousOrderCardData>
                                        </PreviousOrderCardContact>
                                    </PreviousOrderCard>
                                </a>
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
            </Wrapper>
        </Main>
    );
}