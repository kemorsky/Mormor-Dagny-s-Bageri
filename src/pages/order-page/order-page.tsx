import { useState } from "react"
import { Store, OrderDetails, Order } from '../../types/types';
import Menu from "../../elements/menu/menu"
import { InputAmount, InputDiscount, InputOrderDropdown } from "../../components/ui/input"
import { ButtonOrder } from "../../components/ui/button"
import { CardStore, CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson, CardProduct } from "../../blocks/card-order-page";
import { useStores } from "../../components/auth/StoreContext";
import { useProducts } from "../../components/auth/ProductContext";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../components/auth/AuthContext";

export default function OrderPage() {
    const [selected, setSelected] = useState<Store | undefined>(undefined);
    const [query, setQuery] = useState<string>("");
    const [loading, isLoading] = useState<string | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [productQuantities, setProductQuantities] = useState<{ [key: number]: number }>({});
    const [discount, setDiscount] = useState<number>(0);

    const { currentUser } = useAuth()
    const { products } = useProducts()
    const { stores, setStores, searchStores } = useStores()

    const navigate = useNavigate();

    const [newOrder, setNewOrder] = useState<Order>({
        Beställningsdatum: '',
        Beställare: '',
        PreliminärtLeveransdatum: '',
        Säljare: currentUser?.Användarnamn || '',
        Beställningsdetaljer: [],
    });

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery.trim().length < 3) {
            setIsActive(false);
            setStores([]);
        } else {
            setIsActive(true);
            const results = searchStores(newQuery);
            setStores(results);
        }
    };

    const handleSelectedStore = (store: Store) => {
        setSelected(store);
        setQuery('');
        setIsActive(false)
    };

    const handleClearInput = () => {
        setSelected(undefined);
        setQuery('');
        setIsActive(false);
    };

    const totalPrice = products ? products.reduce((acc, product) => {
        const quantity = productQuantities[product.ProduktId ?? 0] || 0;
        return acc + (quantity * (product.Baspris ?? 0));
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        isLoading("Laddar...");

        const orderDetails: OrderDetails[] = products?.map((product) => ({
            ProduktId: product.ProduktId || 0,
            Antal: productQuantities[product.ProduktId ?? 0] || 0,
            Styckpris: (product.Baspris ?? 0) * productQuantities[product.ProduktId ?? 0],
            Rabatt: discount,                // TODO: fix bug where the discount exceeds the price of the item
                                            //  (for example if a 50% discount is applied but product 4 costs 48kr)
        })).filter(item => item.Antal > 0);

        const sentOrder = {
            ...newOrder,
            ButikId: selected?.ButikId || 0,
            Beställare: selected ? selected.ButikNamn : '',
            Beställningsdatum: newOrder.Beställningsdatum || new Date().toISOString(),
            PreliminärtLeveransdatum: newOrder.PreliminärtLeveransdatum || new Date().toISOString(),
            Beställningsdetaljer: orderDetails,
        };

        try {
            if (sentOrder) {
                // const createdOrder = await pushOrder(sentOrder)
                setNewOrder(sentOrder)
                console.log(sentOrder)
                // navigate(`/confirmation-page/${createdOrder.BeställningId}`);
                navigate('/confirm-order', {state: {order: sentOrder}} )
            }
        } catch (error) {
            console.error("Error creating order:", error);
        }
    }

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
                <form className="w-full" onSubmit={handleSubmit}> 
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
                                                value={productQuantities[product.ProduktId ?? 0] || 0 }
                                                onChange={(e) => {
                                                    setProductQuantities((prevQuantities) => ({
                                                        ...prevQuantities,
                                                        [product.ProduktId ?? 0]: parseInt(e.target.value)
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