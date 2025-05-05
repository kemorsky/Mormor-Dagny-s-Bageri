import { useState, useEffect } from "react"
import Menu from "../../elements/menu/menu"
import { pushOrder } from "../../lib/api"
import { formatDate } from '../../lib/formatDate'
import { OrderDetails } from "../../types/types"
import { useLocation, useNavigate } from "react-router"
import { ProductCard, ProductCardName, ProductCardPrice, ProductCardAmount, ProductCardTotalPrice  } from "../../blocks/card"
import { CardStore, CardStoreBreadperson, CardStoreContacts, CardStoreContent, CardStoreInformation, CardStoreOwner } from "../../blocks/card-order-page"
import { useStores } from "../../components/auth/StoreContext"
import { useProducts } from "../../components/auth/ProductContext"
import { ButtonSpinner } from "../../components/ui/button-spinner"
import { Main, Wrapper } from "../../blocks/wrappers";
import { Button } from "../../components/ui/button-shadcn"

export default function OrderDetailsPage() {
    const { state } = useLocation();
    const order = state?.order
    const { getStore } = useStores()
    const { getProduct } = useProducts()
    const store = getStore(order.ButikId)

    const [details, setDetails] = useState<OrderDetails[]>([]);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [orderDiscount, setOrderDiscount] = useState<number>(order?.Rabatt || 0)

    const navigate = useNavigate();

    const products = details.map(detail => getProduct(detail.ProduktId))

    useEffect(() => {
        const getOrderDetails = () => {
            if (order) {
                try {
                  const data = order.Beställningsdetaljer;
                  setDetails(data);
                } catch (error) {
                  console.error("Error fetching order details:", error);
                }
              }
        }
        getOrderDetails()
    }, [order])

    const totalBeforeDiscount = details.reduce((sum, item) => {
        const product = getProduct(item.ProduktId);
        return sum + (product?.Baspris ?? 0) * item.Antal;
      }, 0);
      
    const discountAmount = (orderDiscount / 100) * totalBeforeDiscount;
    const finalTotal = totalBeforeDiscount - discountAmount;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const updatedOrder = {
                ...order,
                Beställningsdetaljer: details.map(item => ({
                  ...item,
                  Rabatt: orderDiscount,
                  Styckpris: (getProduct(item.ProduktId)?.Baspris ?? 0) * item.Antal
                })),
                finalTotal: finalTotal
              };
            const createdOrder = await pushOrder(updatedOrder)
            console.log(createdOrder)
            setIsLoading(false)
            navigate(`/confirmation-page/${createdOrder.BeställningId}`, {state: {order: createdOrder, finalTotal: finalTotal}});
        } catch (error) {
            console.error("Error pushing order:", error);
        }
    }

    return (
        <Main>
            <Wrapper>
                <Menu />
                <form className="w-full max-w-[33.792rem] inline-flex flex-col items-start justify-center gap-3" action="" onSubmit={handleSubmit}>
                    <section className="w-full max-w-[33.792rem] inline-flex flex-col items-start justify-center gap-3">
                        <h2 className="self-start text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Beställning Information</h2>
                        <CardStore>
                            <CardStoreContent>
                                <CardStoreInformation>
                                    <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">Beställningsdatum:
                                        <span className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]"> {formatDate(order.Beställningsdatum)}</span>
                                    </p>
                                    <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">Leveransdatum:
                                        <span className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]"> {formatDate(order.PreliminärtLeveransdatum)}</span>
                                    </p>
                                </CardStoreInformation>
                                <CardStoreInformation>
                                    <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">Beställare:
                                        <span className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]"> {order.Beställare}</span>
                                    </p>
                                    <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">Säljare:
                                        <span className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]"> {order.Säljare}</span>
                                    </p>
                                </CardStoreInformation>
                            </CardStoreContent>
                        </CardStore>
                        <h2 className="self-start text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Kund Information</h2>
                        <CardStore>
                            <CardStoreContent>
                                <CardStoreInformation>
                                    <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">{store?.ButikNamn}
                                        <span className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]"> {store?.ButikNummer}</span>
                                    </p>
                                    <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store?.Besöksadress}</p>
                                </CardStoreInformation>
                                <CardStoreContacts>
                                    <CardStoreOwner>
                                        <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Butikägare: </p>
                                        <article className="w-full flex items-center justify-start gap-1.5">
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store?.ButikschefNamn}</p>
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store?.ButikschefTelefon}</p>
                                        </article>
                                    </CardStoreOwner>
                                    <CardStoreBreadperson>
                                        <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Brödansvarig: </p>
                                        <article className="w-full flex items-center justify-start gap-1.5">
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store?.BrödansvarigNamn}</p>
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store?.BrödansvarigTelefon}</p>
                                        </article>
                                    </CardStoreBreadperson>
                                </CardStoreContacts>
                            </CardStoreContent>                                                             
                        </CardStore>
                    </section>
                    <section className="w-full flex flex-col gap-3">
                        <h2 className="self-start text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Produkter</h2>
                        {details.length > 0 ? (
                        <div className="bg-Branding-cardPrimary shadow-[0px_0px_8px_4px_rgba(180,180,180,0.15)] flex flex-col gap-3 p-3 rounded-xl">
                            <ul className="w-full space-y-4">
                                {products.map((product, index) => (
                                    <li key={index} className="w-full">
                                    <ProductCard className={` ${edit ? 'items-center' : ''}`} >
                                        <ProductCardName>{product?.Namn}</ProductCardName>
                                        <ProductCardPrice>{product?.Baspris} kr</ProductCardPrice>
                                        {edit ? (
                                        <>
                                            <input
                                                type="text"
                                                value={details[index].Antal}
                                                onChange={(e) => {
                                                    const updated = [...details];
                                                    const newAntal = parseInt(e.target.value) || 0;
                                                    updated[index].Antal = newAntal
                                                    setDetails(updated);
                                                }}
                                                className="font-inter text-center bg-Branding-input border border-Branding-textAccent text-Branding-textPrimary rounded px-2 py-1 max-w-12 h-[2.625rem]"
                                            />                                        
                                            <ProductCardTotalPrice>
                                                <span className="text-Branding-textSecondary">Pris: </span>
                                                {(details[index].Antal * (product?.Baspris ?? 0)).toFixed(2)} kr
                                            </ProductCardTotalPrice>
                                        </>
                                        ) : (
                                        <>
                                            <ProductCardAmount>Antal: {details[index].Antal}</ProductCardAmount>
                                            <ProductCardTotalPrice>
                                                <span className="text-Branding-textSecondary">Pris: </span>
                                                {(details[index].Antal * (product?.Baspris ?? 0)).toFixed(2)} kr
                                            </ProductCardTotalPrice>
                                        </>
                                        )}
                                    </ProductCard>
                                    </li>
                                ))}
                            </ul>
                            <hr className="bg-white h-[1px] w-full"/>  
                            <section className="self-end flex flex-col items-end gap-2">       
                                <p className="font-inter text-Branding-textPrimary">Totallt: {totalBeforeDiscount.toFixed(2)} kr</p>
                                {edit ? (
                                    <label className="font-inter text-Branding-textPrimary">
                                        Rabatt(%):
                                        <input
                                            type="text"
                                            value={orderDiscount}
                                            onChange={(e) => {
                                                const updated = parseFloat(e.target.value) || 0;
                                                setOrderDiscount(updated);
                                            }}
                                            className="bg-Branding-input border border-Branding-textAccent text-center rounded px-2 py-1 ml-1 max-w-12 h-[2.625rem]"
                                        />
                                    </label>
                                ) : (
                                    <p className="font-inter text-Branding-textPrimary">Rabatt ({orderDiscount}%): -{discountAmount.toFixed(2)} kr</p>
                                )}
                                <p className="font-inter text-Branding-textPrimary">Totallt med rabatt: {finalTotal.toFixed(2)} kr</p>
                            </section>
                            <div className="self-end flex items-center justify-center gap-3">
                                <Button variant='manage' size='admin' className={`${loading ? 'cursor-not-allowed bg-gray-500 hover:bg-gray-500 text-gray-800 hover:text-gray-800' : ''}`} type="button" onClick={() => setEdit(prev => !prev)}>
                                    {edit ? "Bekräfta" : "Ändra detaljer"}
                                </Button>
                                <Button variant='proceed' size='admin' className={`${loading ? 'cursor-not-allowed bg-gray-500 hover:bg-gray-500 text-gray-800 border border-emerald-600 px-4 py-2 h-[2.625rem] w-[6rem]' : ''}`} type='submit'>
                                    {loading ? <ButtonSpinner/> : "Lägg beställningen"}
                                </Button>
                            </div>
                        </div>
                        ) : (
                        <p>Laddar orderdetaljer...</p>
                        )}
                    </section>
                </form>
            </Wrapper>
        </Main>
    )
}
