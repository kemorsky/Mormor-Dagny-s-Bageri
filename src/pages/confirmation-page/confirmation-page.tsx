import { useState, useEffect } from "react"
import Menu from "../../elements/menu/menu"
import { fetchOrderDetails } from "../../lib/api"
import { formatDate } from '../../lib/formatDate'
import { OrderDetails } from "../../types/types"
import { useLocation, useNavigate } from "react-router"
import { ProductCard, ProductCardName, ProductCardPrice, ProductCardAmount, ProductCardTotalPrice  } from "../../blocks/card"
import { CardStore, CardStoreBreadperson, CardStoreContacts, CardStoreContent, CardStoreInformation, CardStoreOwner } from "../../blocks/card-order-page"
import { ButtonOrder } from "../../components/ui/button"
import { Main, Wrapper } from "../../blocks/wrappers";

export default function ConfirmationPage() {
    const [details, setDetails] = useState<OrderDetails[]>([]);
    const navigate = useNavigate();

    const { state } = useLocation();

    const order = state?.order

    useEffect(() => {
        const getOrderDetails = async () => {
            if (order?.BeställningId) {
                try {
                  const data = await fetchOrderDetails(order.BeställningId);
                  setDetails(data);
                } catch (error) {
                  console.error("Error fetching order details:", error);
                }
              }
        }
        getOrderDetails().catch(console.error)
    }, [order?.BeställningId])

    const calculatedFinalTotal = details.reduce((acc, item) => {
        const discountedPrice = item.Styckpris * (1 - (item.Rabatt ?? 0) / 100);
        return acc + discountedPrice;
      }, 0);

    return (
        <Main>
            <Wrapper>
                <Menu />
                <section className="w-full max-w-[33.792rem] inline-flex flex-col items-start justify-center gap-3">
                    <h1 className="self-start text-2xl text-Branding-textHeading font-open-sans font-semibold">Beställning #{order.BeställningId}</h1>
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
                                <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">{order.Butik.ButikNamn} 
                                    <span className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]"> {order.Butik.ButikNummer}</span>
                                </p>
                                <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{order.Butik.Besöksadress}</p>
                            </CardStoreInformation>
                            <CardStoreContacts>
                                <CardStoreOwner>
                                    <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Butikägare: </p>
                                    <article className="w-full flex items-center justify-start gap-1.5">
                                        <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{order.Butik.ButikschefNamn}</p>
                                        <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{order.Butik.ButikschefTelefon}</p>
                                    </article>
                                </CardStoreOwner>
                                <CardStoreBreadperson>
                                    <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Brödansvarig: </p>
                                    <article className="w-full flex items-center justify-start gap-1.5">
                                        <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{order.Butik.BrödansvarigNamn}</p>
                                        <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{order.Butik.BrödansvarigTelefon}</p>
                                    </article>
                                </CardStoreBreadperson>
                            </CardStoreContacts>
                        </CardStoreContent>                                                             
                    </CardStore>
                </section>
                {details? (
                    <section className="w-full max-w-[33.792rem] inline-flex flex-col items-start justify-center gap-3">
                        <h2 className="self-start text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Beställda produkter</h2>
                        <div className="w-full bg-Branding-cardPrimary shadow-[0px_0px_6px_2px_rgba(100,100,100,0.15)] flex flex-col gap-3 p-3 rounded-xl"> 
                            <ul className="w-full space-y-3">
                                {details.map((product, index) => (
                                <li key={index}>
                                    <ProductCard>
                                        <ProductCardName>{product.Produkt?.Namn}</ProductCardName>
                                        <ProductCardPrice>{product.Produkt?.Baspris} kr</ProductCardPrice>
                                        <ProductCardAmount>Antal: {product.Antal}</ProductCardAmount>
                                        <ProductCardTotalPrice>
                                            <span className="text-Branding-textSecondary">Pris: </span> 
                                            {product.Styckpris.toFixed(2)} kr
                                        </ProductCardTotalPrice>
                                    </ProductCard>
                                </li>
                                ))}
                            </ul>
                            <hr className="bg-white h-[1px] w-full"/>  
                            <section className="self-end flex flex-col items-end gap-2">
                                <p className="font-inter text-Branding-textPrimary">Rabatt: {order?.Beställningsdetaljer?.[0]?.Rabatt}%</p>
                                <p className="font-inter text-Branding-textPrimary">Finallt pris: {calculatedFinalTotal.toFixed(2)}kr</p>
                                <ButtonOrder onClick={() => {navigate('/seller-dashboard')}}>Gå till Hem</ButtonOrder>
                            </section>
                        </div>
                        
                    </section>
                ) : (
                    <p>Laddar orderdetaljer...</p>
                )}
            </Wrapper>
        </Main>
    )
}