import { useState, useEffect, useRef, useMemo } from "react"
import { useNavigate } from "react-router";
import { Store, Product } from '../../types/types';
import Fuse from "fuse.js";
import Menu from "../../elements/menu/menu"
import { fetchStores, fetchProducts } from "../../lib/api";
import { InputAmount, InputDiscount, InputOrderDropdown } from "../../components/ui/input"
import { ButtonOrder } from "../../components/ui/button"
import { CardStore, CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson, CardProduct } from "../../blocks/card-order-page";

export default function OrderPage() {
    const [stores, setStores] = useState<Store[] | null>(null);
    const [selected, setSelected] = useState<Store | null>();
    const [query, setQuery] = useState<string>("");
    const [loading, isLoading] = useState<string | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [products, setProducts] = useState<Product[] | null>(null);
    const [productQuantities, setProductQuantities] = useState<{ [key: number]: number }>({});
    const [discount, setDiscount] = useState<number>(0);

    const allStoresRef = useRef<Store[] | null>(null);

    const navigate = useNavigate();

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
        if (query.trim().length < 3) {
            setStores([]);
            setIsActive(false);
        } else {
            setIsActive(true)
        };

        if (allStoresRef.current) {
            const fuse = new Fuse(allStoresRef.current, options);
            const results = fuse.search(query).map(result => result.item);
            setStores(results);
        };
    }, [query, options]);

    const handleSelectedStore = (store: Store) => {
        console.log("Store selected:", store)
        setSelected(store);
        setQuery('');
        setIsActive(false)
    };

    const handleClearInput = () => {
        setSelected(null);
        setQuery('');
        setIsActive(false);
    };

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

    const totalPrice = products ? products.reduce((acc, product) => {
        const quantity = productQuantities[product.produktId] || 0;
        return acc + (quantity * parseFloat(product.baspris));
      }, 0) : 0;

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let discountValue = e.target.value === '' ? 0 : parseInt(e.target.value);

    if (discountValue < 0) {
        discountValue = 0;
    } else if (discountValue > 100) {
        discountValue = 100;
    };

    if (!isNaN(discountValue)) {
        setDiscount(discountValue);
    }
    };

    const finalPrice = totalPrice !== undefined && discount !== undefined
    ? totalPrice - (totalPrice * discount / 100)
    : 0;

    const handleOrderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        isLoading("Laddar...");
        console.log("Order submitted:", selected, productQuantities, finalPrice.toFixed(2));
    };

    return (
        <main className="w-full min-h-[59.75rem] inline-flex flex-col items-center justify-start bg-gradient-primary px-4">
            <div className="w-full inline-flex flex-col items-center justify-start gap-6 py-3 mt-[3.125rem]">
                <Menu />
                <section className="w-full inline-flex flex-col items-start justify-center gap-3 relative">
                    <form className="w-full border border-Branding-textAccent rounded bg-Branding-input inline-flex items-center justify-between px-4 py-3">
                        <InputOrderDropdown
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)} 
                            />
                        <p onClick={handleClearInput} className="text-base cursor-pointer">Avbryt</p>
                    </form>
                    {isActive && stores && stores.length > 0 && (
                        <ul className="w-full max-h-[16rem] overflow-y-auto bg-Branding-input space-y-1 rounded-[0.5rem] divide-y divide-Branding-textAccent absolute top-[3.875rem]">
                            {stores.map((store) => (
                                <li
                                key={store.butikId}
                                onClick={() => handleSelectedStore(store)}
                                className="block text-[1rem] leading-[1.125rem] font-inter font-semibold text-Branding-textPrimary cursor-pointer px-4 py-4 m-0"
                                >
                                    {store.butikNamn}, {store.besöksadress}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                {selected ? (
                    <section className="w-full inline-flex flex-col items-center justify-center gap-3">
                        <h2 className="self-start text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Kund information</h2>
                        <CardStore className="">
                            <CardStoreContent>
                                <CardStoreInformation>
                                    <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">{selected.butikNamn} 
                                        <span className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]"> {selected.butikNummer}</span>
                                    </p>
                                    <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.besöksadress}</p>
                                </CardStoreInformation>
                                <CardStoreContacts>
                                    <CardStoreOwner>
                                        <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Butikägare: </p>
                                        <article className="w-full flex items-center justify-start gap-1.5">
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.butikschefNamn}</p>
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.butikschefTelefon}</p>
                                        </article>
                                    </CardStoreOwner>
                                    <CardStoreBreadperson>
                                        <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Brödansvarig: </p>
                                        <article className="w-full flex items-center justify-start gap-1.5">
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.brödansvarigNamn}</p>
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.brödansvarigTelefon}</p>
                                        </article>
                                    </CardStoreBreadperson>
                                </CardStoreContacts>
                            </CardStoreContent>                                                             
                        </CardStore>
                    </section>
                ) : (
                    <div className="w-full inline-flex flex-col items-start justify-center gap-3">
                        <h2 className="text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Kund information</h2>
                        <CardStore className="w-full h-full">
                            <CardStoreContent>
                                <CardStoreInformation>
                                    <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">Ingen kund valt än</p>
                                </CardStoreInformation>
                            </CardStoreContent>
                        </CardStore>
                    </div>
                )}
                <section className="w-full inline-flex flex-col items-center justify-center">
                    <h2 className="self-start text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Tidigare beställningar</h2>                
                </section>
                <form className="w-full" onSubmit={handleOrderSubmit}>
                    <section className="w-full inline-flex flex-col items-center justify-center gap-3">
                        <h2 className="self-start text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Produkter</h2>
                        <CardStore className="p-2">
                            <CardStoreContent className="gap-3">
                                {products ? (
                                    products.map((product) => (
                                        <CardProduct key={product.produktId}>
                                            <p className="w-[10rem] font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">{product.namn}</p>
                                            <p className="w-[4rem] font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{product.baspris} kr</p>
                                            <InputAmount 
                                                value={productQuantities[product.produktId] || 0 }
                                                onChange={(e) => {
                                                    setProductQuantities((prevQuantities) => ({
                                                        ...prevQuantities,
                                                        [product.produktId]: parseInt(e.target.value)
                                                    }))
                                            }}
                                            />
                                        </CardProduct>
                                    ))
                                ) : (
                                    <p>Error loading products:</p>
                                )} 
                                <hr className="bg-white h-[1px] w-full"/>
                                <section className="self-end flex flex-col items-end gap-2">
                                    <p>Totallt: {totalPrice.toFixed(2)} kr</p>
                                    <InputDiscount 
                                        value={discount || 0}
                                        onChange={handleDiscountChange}
                                        />
                                    <p>Totallt med rabatt: {finalPrice.toFixed(2)} kr</p>
                                    <ButtonOrder />
                                </section>
                            </CardStoreContent>
                        </CardStore>               
                    </section>
                </form>
            </div>
        </main>
    );
};
