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
import { fetchStores } from "../../lib/api";

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
    phoneNumber: string;
    contactPerson?: string;
};

// Omvandla data från backend till frontend-struktur
const transformData = (stores: any[]) => {
    return stores.map(store => ({
        customerNumber: store.ButikNummer,
        name: store.ButikNamn,
        phoneNumber: store.Telefonnummer,
        address: {
            street: store.Besöksadress.split(",")[0], // Hämtar gatan från Besöksadress
            postalCode: store.Besöksadress.split(",")[1]?.trim() || "", // Hämtar postnummer från Besöksadress
            city: store.Besöksadress.split(",")[2]?.trim() || "" // Hämtar stad från Besöksadress
        },
        storeOwner: store.ButikschefNamn,
        breadManager: store.BrödansvarigNamn,
        active: !store.Låst, // Om "Låst" är true, sätt butiken som inaktiv
        contactPerson: store.ButikschefTelefon, // Eller sätt det till butikschefens telefonnummer
        date: new Date().toLocaleDateString(), // Sätt dagens datum för demo
    }));
};

export default function DashBoard() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [previousOrders, setPreviousOrders] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const scrollRefCurrent = useRef<HTMLDivElement>(null);
    const scrollRefPrevious = useRef<HTMLDivElement>(null);

    // Hämtar data när komponenten mountas
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError(null);
            try {
                const stores = await fetchStores();
                console.log("Stores from backend:", stores);

                // Omvandla data till korrekt struktur
                const transformedStores = transformData(stores);

                // Dela upp butiker i aktiva och inaktiva
                const activeOrders = transformedStores.filter((store: Customer) => store.active);
                const pastOrders = transformedStores.filter((store: Customer) => !store.active);

                setCustomers(activeOrders);
                setPreviousOrders(pastOrders);
            } catch (err) {
                console.error("Failed to fetch stores:", err);
                setError("Kunde inte hämta kunddata.");
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

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

            {loading && <p className="text-white mt-4">Laddar data...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {!loading && !error && (
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
                                {customers.map((customer) => (
                                    <div key={customer.customerNumber} className="snap-center min-w-[320px]">
                                        <Card>
                                            <div className="flex justify-between items-center w-full">
                                                <CardClientNumber className="ml-0 text-lg font-bold">{`${customer.customerNumber}`}</CardClientNumber>
                                                <CardDate className="ml-auto text-lg font-bold">{customer.date}</CardDate>
                                            </div>
                                            <CardHeader>
                                                <CardStore>{customer.name}</CardStore>
                                                <CardAddress className="font-normal text-sm overflow-hidden flex flex-col">
                                                    <span>{customer.address.street}</span>
                                                    <span>{customer.address.postalCode} {customer.address.city}</span>
                                                </CardAddress>
                                            </CardHeader>
                                            <CardFooter className="flex justify-between w-full items-center">
                                                <div className="flex-1 min-w-0 flex flex-col">
                                                    <span>Butiksägare</span>
                                                    <CardClientName className="text-sm text-[#9A9A9A]">
                                                        <span>{customer.storeOwner}</span>
                                                    </CardClientName>
                                                    <CardClientName className="text-sm text-[#9A9A9A]">
                                                        <span>{customer.phoneNumber}</span>
                                                    </CardClientName>
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-col text-right">
                                                    <span>Brödansvarig</span>
                                                    <CardClientName className="text-sm text-[#9A9A9A]">
                                                        <span>{customer.breadManager}</span>
                                                    </CardClientName>
                                                    <CardClientName className="text-sm text-[#9A9A9A]">
                                                        <span>{customer.phoneNumber}</span>
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
            )}
        </main>
    );
}