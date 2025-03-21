import { useState, useEffect, useRef, useMemo } from "react"
import Fuse from "fuse.js";
import Menu from "../../elements/menu/menu"
import { InputAmount, InputOrderDropdown } from "../../components/ui/input"
import { fetchStores, fetchProducts } from "../../lib/api";

import { CardStore, CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson, CardProduct } from "../../blocks/card-order-page";

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

type Product = {
    produktId: number;
    namn: string;
    baspris: string;
};

export default function OrderPage() {
    const [stores, setStores] = useState<Store[] | null>(null);
    const [query, setQuery] = useState<string>("");
    const [loading, isLoading] = useState<string | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [products, setProducts] = useState<Product[] | null>(null);

    const allStoresRef = useRef<Store[] | null>(null);

    const options = useMemo(() => ({
        keys: [
            'butikNummer', 'butikNamn', 'besöksadress', 
            'brödansvarigNamn', 'brödansvarigTelefon', 
            'butikschefNamn', 'butikschefTelefon', 
            'fakturaadress', 'telefonnummer'
        ],
        threshold: 0.3,
        minMatchCharLength: 3
    }), []);

    useEffect(() => {
        const getStores = async () => {
            try {
                const storesData = await fetchStores();
                allStoresRef.current = storesData; 
                setStores(storesData);
            } catch (error) {
                console.error("Fetch Error:", error);
                throw error;
            }
        };
        getStores().catch((error) => {
            console.error("Uncaught error:", error);
          });
    }, []);

    useEffect(() => {
        if (!query.trim()) {
            setStores(allStoresRef.current);
            return;
        }

        if (allStoresRef.current) {
            const fuse = new Fuse(allStoresRef.current, options);
            const results = fuse.search(query).map(result => result.item);
            setStores(results);
        }
    }, [query, options]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productsData = await fetchProducts();
                console.log(productsData)
                setProducts(productsData);
            } catch (error) {
                console.error("Fetch Error:", error);
                throw error;
            }
        }
        getProducts().catch((error) => {
            console.error("Uncaught error:", error);
          });
    }, []);

    return (
        <main className="w-full min-h-[59.75rem] inline-flex flex-col items-center justify-start bg-red-900 px-4">
            <div className="w-full inline-flex flex-col items-center justify-start gap-6 py-3 mt-[3.125rem]">
                <Menu />
                <section className="w-full inline-flex flex-col items-start justify-center gap-3">
                    <InputOrderDropdown 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        onFocus={() => setIsActive(true)}/>
                </section>
                <section className="w-full inline-flex flex-col items-center justify-center gap-3">
                    <h2 className="self-start text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Kund information</h2>
                    {stores ? (
                        stores.map((store) =>
                            <CardStore key={store.butikId} className="flex flex-col items-start justify-start">
                                <CardStoreContent>
                                    <CardStoreInformation>
                                        <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">{store.butikNamn} <span className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">{store.butikNummer}</span></p>
                                        <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store.besöksadress}</p>
                                    </CardStoreInformation>
                                    <CardStoreContacts>
                                        <CardStoreOwner>
                                            <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Butikägare: </p>
                                            <article className="w-full flex items-center justify-start gap-1.5">
                                                <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store.butikschefNamn}</p>
                                                <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store.butikschefTelefon}</p>
                                            </article>
                                        </CardStoreOwner>
                                        <CardStoreBreadperson>
                                            <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Brödansvarig: </p>
                                            <article className="w-full flex items-center justify-start gap-1.5">
                                                <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store.brödansvarigNamn}</p>
                                                <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store.brödansvarigTelefon}</p>
                                            </article>
                                        </CardStoreBreadperson>
                                    </CardStoreContacts>
                                </CardStoreContent>                                                             
                            </CardStore>
                    )
                    ) : (
                        <p>Error loading stores:</p>
                    )}
                </section>
                <section>
                    <h2 className="self-start text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Tidigare beställningar</h2>                
                </section>
                <section className="w-full inline-flex flex-col items-center justify-center gap-3">
                    <h2 className="self-start text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Produkter</h2>
                    <CardStore className="p-2">
                        <CardStoreContent className="gap-3">
                            {products ? (
                                products.map((product) => (
                                    <CardProduct key={product.produktId}>
                                        <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">{product.namn}</p>
                                        <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{product.baspris} kr</p>
                                        <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">Antal: <InputAmount /></p>
                                    </CardProduct>
                                ))
                            ) : (
                                <p>Error loading products:</p>
                            )} 
                        </CardStoreContent>
                    </CardStore>               
                </section>
            </div>
        </main>
    );
};
