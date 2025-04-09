import { useState } from "react"
// import { useNavigate } from "react-router";
import { Store, Product, OrderDetails, Order } from '../../types/types';
import Menu from "../../elements/menu/menu"
// import { pushOrder } from "../../lib/api";
import { InputAmount, InputDiscount, InputOrderDropdown } from "../../components/ui/input"
import { ButtonOrder } from "../../components/ui/button"
import { CardStore, CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson, CardProduct } from "../../blocks/card-order-page";
import { useStores } from "../../components/auth/StoreContext";
import { useProducts } from "../../components/auth/ProductContext";

export default function OrderPage() {
    const [selected, setSelected] = useState<Store | null>(null);
    const [query, setQuery] = useState<string>("");
    const [loading, isLoading] = useState<string | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [productQuantities, setProductQuantities] = useState<{ [key: number]: number }>({});
    const [discount, setDiscount] = useState<number>(0);
    // const [orderDetails, setOrderDetails] = useState<OrderDetails | null>();

    const { products } = useProducts()
    const { stores, setStores, searchStores } = useStores()

    // const navigate = useNavigate();

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery.trim().length < 3) {
            setIsActive(false);
            setStores([]); // Optionally clear stores if query is too short
        } else {
            setIsActive(true);
            const results = searchStores(newQuery); // Perform the search via the provider
            setStores(results);
        }
    };

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

    const totalPrice = products ? products.reduce((acc, product) => {
        const quantity = productQuantities[product.ProduktId] || 0;
        return acc + (quantity * product.Baspris);
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

    // const handleOrderSubmit = async (e: React.FormEvent) => { // TODO redo from scratch once admin is finished
    //     e.preventDefault();
    //     isLoading("Laddar...");
    //     const orderDetails: OrderDetails = {
    //         BeställningsdetaljId: 0,
    //         BeställningId: 0,
    //         ProduktId: 0,
    //         Antal: Object.values(productQuantities).reduce((acc, quantity) => acc + quantity, 0),
    //         Styckpris: finalPrice, // - inte finalPrice. Skapa ny variabel i Table i databasen
    //         Rabatt: discount,
    //         Produkt: products?.filter((product) => productQuantities[product.ProduktId] > 0).map((product) => ({
    //             ProduktId: product.ProduktId,
    //             Namn: product.Namn,
    //             Baspris: product.Baspris,
    //             isDeleted: false,
    //             Antal: productQuantities[product.ProduktId],
    //             Styckpris: product.Baspris * productQuantities[product.ProduktId], // Inte totallt pris men pris per 1st produkt. Behöver totallt pris
    //           })) as Product[]
    //       };
    //     setOrderDetails(orderDetails);
    //     console.log(orderDetails)
    //     try {
    //         const response = await pushOrder(orderDetails);
    //         if (!response) {
    //             console.error("Error submitting order:", response.error);
    //           }
    //     } catch (error) {
    //         console.error("Error pushing order:", error);
    //     }
    //     // console.log("Order submitted:", selected, productQuantities, finalPrice.toFixed(2));
    // };

    // TODO:
    // - Fixa beställningsdetaljer response (utkastar 404 just nu)
    // - Skapa ny Table med totalltpris 
    // - Ändra/anpassa Produkt Table i Beställningsdetaljer så att det är likadan/exakt samma som Produkt Table i /produkter
    // - dela komponenten i mindre delar så att det inte blir 300 linjer lång

    return (
        <main className="w-full min-h-[59.75rem] inline-flex flex-col items-center justify-start bg-gradient-primary px-4">
            <div className="w-full inline-flex flex-col items-center justify-start gap-6 py-3 mt-[3.125rem]">
                <Menu />
                <section className="w-full inline-flex flex-col items-start justify-center gap-3 relative">
                    <form className="w-full border border-Branding-textAccent rounded bg-Branding-input inline-flex items-center justify-between px-4 py-3">
                        <InputOrderDropdown
                            value={query} 
                            onChange={handleQueryChange} 
                            />
                        <p onClick={handleClearInput} className="text-base cursor-pointer">Avbryt</p>
                    </form>
                    {isActive && stores && stores.length > 0 && (
                        <ul className="w-full max-h-[16rem] overflow-y-auto bg-Branding-input space-y-1 rounded-[0.5rem] divide-y divide-Branding-textAccent absolute top-[3.875rem]">
                            {stores.map((store) => (
                                <li
                                key={store.ButikId}
                                onClick={() => handleSelectedStore(store)}
                                className="block text-[1rem] leading-[1.125rem] font-inter font-semibold text-Branding-textPrimary cursor-pointer px-4 py-4 m-0"
                                >
                                    {store.ButikNamn}, {store.Besöksadress}
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
                                    <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">{selected.ButikNamn} 
                                        <span className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]"> {selected.ButikNummer}</span>
                                    </p>
                                    <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.Besöksadress}</p>
                                </CardStoreInformation>
                                <CardStoreContacts>
                                    <CardStoreOwner>
                                        <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Butikägare: </p>
                                        <article className="w-full flex items-center justify-start gap-1.5">
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.ButikschefNamn}</p>
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.ButikschefTelefon}</p>
                                        </article>
                                    </CardStoreOwner>
                                    <CardStoreBreadperson>
                                        <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Brödansvarig: </p>
                                        <article className="w-full flex items-center justify-start gap-1.5">
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.BrödansvarigNamn}</p>
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.BrödansvarigTelefon}</p>
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
                <form className="w-full"> {/*TODO: re-add onSubmit={handleQueryChange} once it works properly*/}
                    <section className="w-full inline-flex flex-col items-center justify-center gap-3">
                        <h2 className="self-start text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Produkter</h2>
                        <CardStore className="p-2">
                            <CardStoreContent className="gap-3">
                                {products ? (
                                    products.map((product) => (
                                        <CardProduct key={product.ProduktId}>
                                            <p className="w-[10rem] font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">{product.Namn}</p>
                                            <p className="w-[4rem] font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{product.Baspris} kr</p>
                                            <InputAmount 
                                                value={productQuantities[product.ProduktId] || 0 }
                                                onChange={(e) => {
                                                    setProductQuantities((prevQuantities) => ({
                                                        ...prevQuantities,
                                                        [product.ProduktId]: parseInt(e.target.value)
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
