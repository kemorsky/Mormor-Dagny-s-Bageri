import { Card, CardDate, CardHeader, CardAddress, CardFooter, CardClientName, CardClientNumber, CardStore, CardOrderId } from "../../blocks/card";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "../../components/ui/carousel";
import Menu from "./../../elements/menu/menu";
import { useFilteredOrdersSeller } from "../../hooks/useFilteredOrdersSeller";
import { formatDate } from "../../lib/formatDate";
import { formatPhoneNumber } from "../../lib/formatPhoneNumber";
import { Main, Wrapper } from "../../blocks/wrappers";
import { PreviousOrderCard, PreviousOrderCardHeader, PreviousOrderCardHeaderId, PreviousOrderCardHeaderDate, PreviousOrderCardContact, 
         PreviousOrderCardContactStore, PreviousOrderCardData } from "../../blocks/card-order-page";

export default function DashBoard() {
    const { upcoming, previous } = useFilteredOrdersSeller();

    return (
        <Main>
            <Wrapper>
                <Menu />
                {/* Pågående beställningar */}
                <div className="w-full max-w-[50rem] inline-flex flex-col items-start justify-center gap-3 relative">
                    <h2 className="self-start text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Dina pågående beställningar</h2>
                    <Carousel className="w-full h-full min-h-[200px]">
                        <CarouselContent className="w-full h-full min-h-[200px]">
                            {upcoming.map((order) => (
                                <CarouselItem key={order.BeställningId}>
                                    <a href={`/order/${order.BeställningId}`} className='min-w-[305px] min-h-[200px]'>
                                        <Card>
                                            <div className="flex justify-between items-center w-full">
                                                <CardOrderId>#{order.BeställningId}</CardOrderId>
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
                                                    <span className="text-Branding-textPrimary text-sm">Butiksägare</span>
                                                    <CardClientName className="text-sm text-Branding-textSecondary">
                                                        <span>{order.Butik?.ButikschefNamn}</span>
                                                    </CardClientName>
                                                    <CardClientNumber className="text-sm font-normal">
                                                        <span>{formatPhoneNumber(order.Butik?.ButikschefTelefon ?? '')}</span>
                                                    </CardClientNumber>
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-col text-right">
                                                    <span className="text-Branding-textPrimary text-sm">Brödansvarig</span>
                                                    <CardClientName className="text-sm text-Branding-textSecondary">
                                                        <span>{order.Butik?.BrödansvarigNamn}</span>
                                                    </CardClientName>
                                                    <CardClientNumber className="text-sm font-normal text-right">
                                                        {formatPhoneNumber(order.Butik?.BrödansvarigTelefon ?? '')}
                                                    </CardClientNumber>
                                                </div>
                                            </CardFooter>
                                        </Card>    
                                    </a>                        
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden sm:flex"/>
                        <CarouselNext className="hidden sm:flex"/>
                    </Carousel>
                </div>

                {/* Tidigare beställningar */}
                <div className="w-full max-w-[50rem] inline-flex flex-col items-center justify-start gap-3 mt-10">
                    <h2 className="self-start text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Dina tidigare beställningar</h2>
                    <Carousel className="w-full h-full min-h-[10.75rem]">
                        <CarouselContent>
                                {previous.map((order) => (
                                    <CarouselItem key={order.BeställningId} className="max-w-[180px]">
                                        <a href={`/order/${order.BeställningId}`} className='min-w-[10.75rem] min-h-[10.75rem]'>
                                            <PreviousOrderCard>
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
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden sm:flex"/>
                        <CarouselNext className="hidden sm:flex"/>
                    </Carousel>
                </div>
            </Wrapper>
        </Main>
    );
}