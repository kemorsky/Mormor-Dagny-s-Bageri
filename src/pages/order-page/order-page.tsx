import { useState, useEffect } from "react"
import Menu from "../../elements/menu/menu"
import { InputPrimary } from "../../components/ui/input"

import { fetchStores } from "../../lib/api";

type Store = {
    butikId: number;
    butikNummer: string;
    butikNamn: string;
    besöksadress: string;
    brödansvarigNamn: string;
    brödansvarigTelefon: string;
    butikschefNamn: string;
    butikschefTelefon: string;
    fakturaadress: string;
    låst: boolean;
    telefonnummer: string;
};

export default function OrderPage() {
    const [stores, setStores] = useState<Store[] | null>(null);
    const [loading, isLoading] = useState<string | null>(null);

    useEffect(() => {
        const getStores = async () => {
            try {
                const storesData = await fetchStores();
                setStores(storesData);
            } catch (error) {
                console.error("Fetch Error:", error);
                throw error;
            }
        };
        getStores().catch((error) => {
            console.error("Uncaught error:", error);
            // Handle the error here, e.g. set an error message
          });
    }, []);

    return (
        <main className="w-full min-h-[59.75rem] inline-flex flex-col items-center justify-start bg-red-900 px-4">
            <div className="w-full inline-flex flex-col items-center justify-start gap-6 py-3 mt-[3.125rem]">
                <Menu />
                <section className="w-full inline-flex flex-col items-start justify-center gap-3">
                    <InputPrimary />
                </section>
                <section className="w-full inline-flex flex-col items-start justify-center gap-3">
                {stores ? (
                    stores.map((store) => <p key={store.butikId}>{store.butikNamn}</p>)
                ) : (
                    <p>Error loading stores:</p>
                )}
                </section>
            </div>
        </main>
    );
};
