import { useState, useEffect } from "react"
import Menu from "../../elements/menu/menu"
import { fetchOrderDetails } from "../../lib/api"
import { OrderDetails } from "../../types/types"
import { useLocation, useNavigate } from "react-router"
import { ProductCard, ProductCardName, ProductCardPrice, ProductCardAmount  } from "../../blocks/card"
import { CardStore, CardStoreBreadperson, CardStoreContacts, CardStoreContent, CardStoreInformation, CardStoreOwner } from "../../blocks/card-order-page"

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
        <main>
            <Menu />
            <h1 className="text-2xl">Beställning #{order.BeställningId}</h1>
            <section>
                <CardStore>
                    <CardStoreContent>
                        <CardStoreOwner>
                            <strong>Datum:</strong>{order.Beställningsdatum}
                        </CardStoreOwner>
                        <CardStoreOwner>
                            <strong>Leveransdatum:</strong>{order.PreliminärtLeveransdatum}
                        </CardStoreOwner>
                        <CardStoreOwner>
                            <strong>Beställare:</strong>{order.Beställare}
                        </CardStoreOwner>
                        <CardStoreOwner>
                            <strong>Säljare:</strong>{order.Säljare}
                        </CardStoreOwner>
                    </CardStoreContent>
                </CardStore>
                <CardStore className="">
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
                <section>
                    <h2 className="text-2xl">Beställda produkter</h2>
                    <div> 
                        <ul>
                            {details.map((product, index) => (
                            <li key={index}>
                                <ProductCard>
                                    <ProductCardName>{product.Produkt?.Namn}</ProductCardName>
                                    <ProductCardAmount>Antal: {product.Antal}</ProductCardAmount>
                                    <ProductCardPrice>Pris: {product.Produkt?.Baspris}</ProductCardPrice>
                                    <ProductCardPrice>Tottaltpris: {product.Styckpris}</ProductCardPrice>
                                </ProductCard>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <p>Rabatt: {order?.Beställningsdetaljer?.[0]?.Rabatt}%</p>
                    <p className="font-bold">Totallt pris: {calculatedFinalTotal.toFixed(2)}kr</p>
                    <button onClick={() => {navigate('/seller-dashboard')}}>Gå till Hem</button>
                </section>
            ) : (
                <p>Laddar orderdetaljer...</p>
            )}
        </main>
    )
}