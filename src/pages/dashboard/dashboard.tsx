import { useEffect, useRef, useState } from "react";
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
import { ButtonSecondary, ButtonTertiary } from "../../components/ui/button";
import Menu from "../../elements/menu/menu";
import { fetchStores, fetchOrders } from "../../lib/api";

type Address = {
    street: string;
    postalCode: string;
    city: string;
};

type Store = {
    id: number;
    customerNumber: string;
    name: string;
    date: string;
    address: Address;
    storeOwner: string;
    storeOwnerPhone: string;
    breadManager: string;
    breadManagerPhone: string;
};

type Order = {
    BeställningId: number;
    PreliminärtLeveransdatum: string;
    Beställare: string;
    Säljare: string;
    Beställningsdetaljer: any[];
    Butik: Store;
};

export default function DashBoard() {
    const [stores, setStores] = useState<Store[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [pastOrders, setPastOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Hämta butiker
                const storeData = await fetchStores();
                console.log("Data från backend (butiker):", storeData);

                const mappedStores = storeData
                    .filter((store: any) => store.ButikId >= 1 && store.ButikId <= 4)
                    .map((store: any) => {
                        const fullAddress = store.Besöksadress ?? "";
                        const [streetRaw, postalCityRaw] = fullAddress.split(",");
                        const street = streetRaw?.trim() ?? "";
                        const postalCity = postalCityRaw?.trim() ?? "";
                        const [postalCode, ...cityParts] = postalCity.split(" ");
                        const city = cityParts.join(" ");

                        return {
                            id: store.ButikId,
                            customerNumber: store.ButikNummer,
                            name: store.ButikNamn,
                            date: new Date().toLocaleDateString("sv-SE"),
                            address: {
                                street,
                                postalCode,
                                city,
                            },
                            storeOwner: store.ButikschefNamn,
                            storeOwnerPhone: store.ButikschefTelefon,
                            breadManager: store.BrödansvarigNamn,
                            breadManagerPhone: store.BrödansvarigTelefon,
                        };
                    });

                setStores(mappedStores);
            } catch (err) {
                console.error("Fel vid hämtning av butiker:", err);
                setError("Kunde inte hämta data.");
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Hämta beställningar
                const orderData = await fetchOrders();
                console.log("Data från backend (beställningar):", orderData);

                if (Array.isArray(orderData.Data)) {
                    console.log("Alla beställningar:", orderData.Data);

                    const activeOrders = orderData.Data.filter((order: Order) => {
                        const deliveryDate = new Date(order.PreliminärtLeveransdatum);
                        console.log(
                            "Order ID:",
                            order.BeställningId,
                            "PreliminärtLeveransdatum:",
                            order.PreliminärtLeveransdatum,
                            "Parsed Date:",
                            deliveryDate,
                            "Is Future Date:",
                            deliveryDate > new Date()
                        );
                        return deliveryDate > new Date();
                    });

                    console.log("Active orders:", activeOrders);

                    const pastOrders = orderData.Data.filter((order: Order) => {
                        const deliveryDate = new Date(order.PreliminärtLeveransdatum);
                        return deliveryDate <= new Date();
                    });

                    setOrders(activeOrders);
                    setPastOrders(pastOrders);
                } else {
                    console.error("Fel: orderData.Data är inte en array.", orderData);
                    setError("Kunde inte hämta beställningar korrekt.");
                }
            } catch (err) {
                console.error("Fel vid hämtning:", err);
                setError("Kunde inte hämta data.");
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
    };

    return (
        <main className="min-h-screen w-full bg-gradient-primary flex flex-col items-center justify-start pt-12 relative">
            <Menu />

            {loading && <p className="text-white mt-4">Laddar data...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {!loading && !error && (
                <div className="flex-grow w-full flex flex-col items-center gap-10">
                    {/* Pågående Beställningar */}
                    <div className="w-full flex flex-col items-center gap-3">
                        <article className="w-[90%] max-w-[480px] flex items-center justify-between">
                            <p className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textPrimary">
                                Dina pågående beställningar
                            </p>
                            <ButtonSecondary>Se alla</ButtonSecondary>
                        </article>

                        <div className="relative w-full max-w-[90vw]">
                            <button
                                onClick={scrollLeft}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 text-white rounded-full z-10"
                            >
                                ←
                            </button>

                            <div
                                ref={scrollRef}
                                className="w-full overflow-x-auto scrollbar-hide inline-flex flex-row gap-3 snap-x snap-mandatory scroll-smooth px-10"
                                style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                }}
                            >
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <div key={order.BeställningId} className="snap-center min-w-[320px] max-w-[320px]">
                                            <Card>
                                                <div className="flex justify-between items-center w-full">
                                                    <CardClientNumber className="ml-0 text-lg font-bold">
                                                        {order.Butik.ButikNummer}
                                                    </CardClientNumber>
                                                    <CardDate className="ml-auto text-lg font-bold">
                                                        {new Date(order.PreliminärtLeveransdatum).toLocaleDateString("sv-SE")}
                                                    </CardDate>
                                                </div>
                                                <CardHeader>
                                                    <CardStore>{order.Butik.ButikNamn}</CardStore>
                                                    <CardAddress className="font-normal text-sm overflow-hidden flex flex-col">
                                                        <span>{order.Butik.Fakturaadress}</span>
                                                    </CardAddress>
                                                </CardHeader>
                                                <CardFooter className="flex justify-between w-full items-center">
                                                    <div className="flex-1 min-w-0 flex flex-col">
                                                        <span>Butiksägare</span>
                                                        <CardClientName className="text-sm text-[#9A9A9A] flex flex-col">
                                                            <span>{order.Butik.ButikschefNamn}</span>
                                                            <span>{order.Butik.ButikschefTelefon}</span>
                                                        </CardClientName>
                                                    </div>
                                                    <div className="flex-1 min-w-0 flex flex-col text-right">
                                                        <span>Brödansvarig</span>
                                                        <CardClientName className="text-sm text-[#9A9A9A] flex flex-col">
                                                            <span>{order.Butik.BrödansvarigNamn}</span>
                                                            <span>{order.Butik.BrödansvarigTelefon}</span>
                                                        </CardClientName>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-white">Inga pågående beställningar</p>
                                )}
                            </div>

                            <button
                                onClick={scrollRight}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 text-white rounded-full z-10"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    {/* Tidigare Beställningar */}
                    <div className="w-full flex flex-col items-center gap-3">
                        <article className="w-[90%] max-w-[480px] flex items-center justify-between">
                            <p className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textPrimary">
                                Dina tidigare beställningar
                            </p>
                            <ButtonTertiary>Se alla</ButtonTertiary>
                        </article>

                        <div className="relative w-full max-w-[90vw]">
                            <button
                                onClick={scrollLeft}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 text-white rounded-full z-10"
                            >
                                ←
                            </button>

                            <div
                                ref={scrollRef}
                                className="w-full overflow-x-auto scrollbar-hide inline-flex flex-row gap-3 snap-x snap-mandatory scroll-smooth px-10"
                                style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                }}
                            >
                                {pastOrders.map((order) => (
                                    <div key={order.BeställningId} className="snap-center min-w-[320px] max-w-[320px]">
                                        <Card>
                                            <div className="flex justify-between items-center w-full">
                                                <CardClientNumber className="ml-0 text-lg font-bold">
                                                    {order.Butik.ButikNummer}
                                                </CardClientNumber>
                                                <CardDate className="ml-auto text-lg font-bold">
                                                    {new Date(order.PreliminärtLeveransdatum).toLocaleDateString("sv-SE")}
                                                </CardDate>
                                            </div>
                                            <CardHeader>
                                                <CardStore>{order.Butik.ButikNamn}</CardStore>
                                                <CardAddress className="font-normal text-sm overflow-hidden flex flex-col">
                                                    <span>{order.Butik.Fakturaadress}</span>
                                                </CardAddress>
                                            </CardHeader>
                                            <CardFooter className="flex justify-between w-full items-center">
                                                <div className="flex-1 min-w-0 flex flex-col">
                                                    <span>Butiksägare</span>
                                                    <CardClientName className="text-sm text-[#9A9A9A] flex flex-col">
                                                        <span>{order.Butik.ButikschefNamn}</span>
                                                        <span>{order.Butik.ButikschefTelefon}</span>
                                                    </CardClientName>
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-col text-right">
                                                    <span>Brödansvarig</span>
                                                    <CardClientName className="text-sm text-[#9A9A9A] flex flex-col">
                                                        <span>{order.Butik.BrödansvarigNamn}</span>
                                                        <span>{order.Butik.BrödansvarigTelefon}</span>
                                                    </CardClientName>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={scrollRight}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-0 w-8 h-8 bg-gray-600 text-white rounded-full z-10"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}