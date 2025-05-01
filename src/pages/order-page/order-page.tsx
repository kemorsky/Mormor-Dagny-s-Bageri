import { useState } from "react"
import { Store, OrderDetails, Order } from '../../types/types';
import Menu from "../../elements/menu/menu"
import { InputAmount, InputDiscount, InputOrderDropdown } from "../../components/ui/input"
import { CardStore, CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson, CardProduct, 
        PreviousOrderCard, PreviousOrderCardHeader, PreviousOrderCardHeaderId, PreviousOrderCardHeaderDate, PreviousOrderCardContact,
        PreviousOrderCardContactStore, PreviousOrderCardData
 } from "../../blocks/card-order-page";
import { useStores } from "../../components/auth/StoreContext";
import { useProducts } from "../../components/auth/ProductContext";
import { useNavigate } from "react-router-dom";
import { Main, Wrapper } from "../../blocks/wrappers";
import { useAuth } from "../../components/auth/AuthContext";
import { fetchOrdersByStore } from "../../lib/api";
import { Button } from "../../components/ui/button-shadcn";

export default function OrderPage() {
    const { currentUser } = useAuth()
    const { products } = useProducts()
    const { stores, setStores, searchStores } = useStores()

    const [selected, setSelected] = useState<Store | undefined>(undefined);
    const [selectedOrders, setSelectedOrder] = useState<Order[]>([])
    const [query, setQuery] = useState<string>("");
    const [loading, isLoading] = useState<string | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [productQuantities, setProductQuantities] = useState<{ [key: number]: number }>({});
    const [discount, setDiscount] = useState<number>(0);
    const [newOrder, setNewOrder] = useState<Order>({
        Beställningsdatum: '',
        Beställare: '',
        PreliminärtLeveransdatum: '',
        Säljare: currentUser?.Användarnamn || '',
        Beställningsdetaljer: [],
    });

    const navigate = useNavigate();

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

    const handleSelectedStore = async (store: Store) => {
        setSelected(store);
        setQuery(store.ButikNamn);
        setIsActive(false)
        try {
            const orders = await fetchOrdersByStore(store.ButikId ?? 0);
            setSelectedOrder(orders)
        } catch (error) {
            console.log(error)
        }
    };

    const handleClearInput = () => {
        setSelected(undefined);
        setQuery('');
        setSelectedOrder([])
        setProductQuantities({});
        setDiscount(0);
        setIsActive(false);
    };

    const handleOrderClick = (order: Order) => {
        if (!order.Beställningsdetaljer) return;
    
        const newQuantities: { [key: number]: number } = {};
        order.Beställningsdetaljer.forEach(detail => {
            newQuantities[detail.ProduktId] = detail.Antal;
        });
        setProductQuantities(newQuantities);
        setDiscount(order.Beställningsdetaljer[0]?.Rabatt || 0);
        setNewOrder({
            ...newOrder,
            Beställare: order.Beställare,
            Beställningsdatum: order.Beställningsdatum,
            PreliminärtLeveransdatum: order.PreliminärtLeveransdatum,
            Beställningsdetaljer: order.Beställningsdetaljer,
        });
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
            Rabatt: discount,
        })).filter(item => item.Antal > 0);

        const sentOrder = {
            ...newOrder,
            ButikId: selected?.ButikId || 0,
            Beställare: selected ? selected.ButikNamn : '',
            Beställningsdatum: newOrder.Beställningsdatum || new Date().toISOString(),
            PreliminärtLeveransdatum: newOrder.PreliminärtLeveransdatum || new Date(Date.now() + (Math.random() * 72 * 60 * 60 * 1000)).toISOString(),
            Beställningsdetaljer: orderDetails,
            Rabatt: discount,
        };

        try {
            if (sentOrder) {
                setNewOrder(sentOrder)
                console.log(sentOrder)
                navigate('/confirm-order', {state: {order: sentOrder}} )
            }
        } catch (error) {
            console.error("Error creating order:", error);
        }
    }

    return (
        <Main>
            <Wrapper>
                <Menu />
                <section className="w-full max-w-[33.792rem] inline-flex flex-col items-start justify-center gap-3 relative">
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
                    <section className="w-full max-w-[33.792rem] inline-flex flex-col items-center justify-center gap-3">
                        <h2 className="self-start text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Kund information</h2>
                        <CardStore>
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
                                <CardStoreBreadperson>
                                    <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Fakturaadress: </p>
                                    <article className="w-full flex items-center justify-start gap-1.5">
                                        <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.Fakturaadress}</p>
                                    </article>
                                </CardStoreBreadperson>
                            </CardStoreContent>                                                             
                        </CardStore>
                    </section>
                ) : (
                    <div className="w-full max-w-[33.792rem] inline-flex flex-col items-start justify-center gap-3">
                        <h2 className="text-[1.125rem] leading-[1.375rem] text-Branding-textHeading font-open-sans font-semibold">Kund information</h2>
                        <CardStore className="w-full h-full">
                            <CardStoreContent>
                                <CardStoreInformation>
                                    <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">Ingen kund valt än</p>
                                </CardStoreInformation>
                            </CardStoreContent>
                        </CardStore>
                    </div>
                )}
                <section className="w-full max-w-[33.792rem] max-h-[13.25rem] inline-flex flex-col items-center justify-center gap-3">
                    <h2 className="self-start text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Tidigare beställningar</h2>
                    <div className="w-full flex justify-start sm:justify-center items-center gap-3 overflow-x-auto no-scrollbar sm:overflow-visible scroll-snap-type-x">
                        {selectedOrders ? (
                            [...selectedOrders]
                            .sort((a, b) => new Date(b.PreliminärtLeveransdatum).getTime() - new Date(a.PreliminärtLeveransdatum).getTime())
                            .slice(0, 3)
                            .map((order) => (
                                <div key={order.BeställningId}> {/* Div wrapper för att annars overflow-x-scroll inte fungerar */}
                                    <PreviousOrderCard className="cursor-pointer" onClick={() => {handleOrderClick(order)}}>
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
                                </div>
                            ))
                        ) : (null)}
                    </div>       
                </section>
                <form className="w-full max-w-[33.792rem]" onSubmit={handleSubmit}> 
                    <section className="w-full inline-flex flex-col items-center justify-center gap-3">
                        <h2 className="self-start text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Produkter</h2>
                        <CardStore>
                            <CardStoreContent className="gap-4">
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
                                                }}/>
                                        </CardProduct>
                                    ))
                                ) : (
                                    <p>Error loading products:</p>
                                )} 
                                <hr className="bg-white h-[1px] w-full"/>
                                <section className="self-end flex flex-col items-end gap-2">
                                    <p className="font-inter text-Branding-textPrimary">Totallt: {totalPrice.toFixed(2)} kr</p>
                                    <InputDiscount 
                                        value={discount || 0}
                                        onChange={handleDiscountChange}
                                        />
                                    <p className="font-inter text-Branding-textPrimary">Totallt med rabatt: {finalPrice.toFixed(2)} kr</p>
                                    <Button variant='proceed' size='smaller'> Gå vidare</Button>
                                </section>
                            </CardStoreContent>
                        </CardStore>               
                    </section>
                </form>
            </Wrapper>
        </Main>
    );
};