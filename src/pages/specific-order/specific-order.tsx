import { useState, useEffect } from "react"
import { fetchSpecificOrder } from "../../lib/api"
import { formatDate } from "../../lib/formatDate";
import { Order } from "../../types/types";
import { useParams } from 'react-router';
import { CardStore, ProductCard, ProductCardName, ProductCardAmount, ProductCardPrice } from "../../blocks/card";
import { CardStoreContent, CardStoreOwner, CardStoreInformation, CardStoreContacts, CardStoreBreadperson } from "../../blocks/card-order-page";
import Menu from "../../elements/menu/menu";

export default function SpecificOrder() {
    const [order, setOrder] = useState<Order>();

    const { id = '' } = useParams();

    useEffect(() => {
        const getOrder = async () => {
            const orderId = parseInt(id);
          try {
            const order = await fetchSpecificOrder(orderId);
            setOrder(order);
          } catch (error) {
            console.error("Error fetching this order:", error);
          }
        };
        getOrder();
      }, [id]);

      const finalTotal = order?.Beställningsdetaljer?.reduce((acc, item) => {
        const base = item.Styckpris || 0;
        const discounted = base * (1 - order?.Beställningsdetaljer?.[0]?.Rabatt / 100);
        return acc + discounted;
      }, 0);

    if (!order) {return <div>Loading...</div>}

    return (
        <main>
            <Menu />
            <h1 className="text-2xl">Beställning #{order.BeställningId}</h1>
            <section>
                <CardStore>
                    <CardStoreContent>
                        <CardStoreOwner>
                            <strong>Beställningsdatum:</strong>{formatDate(order.Beställningsdatum)}
                        </CardStoreOwner>
                        <CardStoreOwner>
                            <strong>Leveransdatum:</strong>{formatDate(order.PreliminärtLeveransdatum)}
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
                            <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">{order.Butik?.ButikNamn} 
                                <span className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]"> {order.Butik?.ButikNummer}</span>
                            </p>
                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{order?.Butik?.Besöksadress}</p>
                        </CardStoreInformation>
                        <CardStoreContacts>
                            <CardStoreOwner>
                                <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Butikägare: </p>
                                <article className="w-full flex items-center justify-start gap-1.5">
                                    <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{order.Butik?.ButikschefNamn}</p>
                                    <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{order.Butik?.ButikschefTelefon}</p>
                                </article>
                            </CardStoreOwner>
                            <CardStoreBreadperson>
                                <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Brödansvarig: </p>
                                <article className="w-full flex items-center justify-start gap-1.5">
                                    <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{order.Butik?.BrödansvarigNamn}</p>
                                    <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{order.Butik?.BrödansvarigTelefon}</p>
                                </article>
                            </CardStoreBreadperson>
                        </CardStoreContacts>
                    </CardStoreContent>                                                             
                </CardStore>
            </section>
            {order?.Beställningsdetaljer? (
                <section>
                    <h2 className="text-2xl">Beställda produkter</h2>
                    <div> 
                        <ul>
                            {order?.Beställningsdetaljer?.map((product, index) => (
                            <li key={index}>
                                <ProductCard>
                                    <ProductCardName>{product.Produkt?.Namn}</ProductCardName>
                                    <ProductCardPrice>{product.Produkt?.Baspris} kr</ProductCardPrice>
                                    <ProductCardAmount>Antal: {product.Antal}</ProductCardAmount>
                                    <ProductCardPrice>Tottaltpris: {product.Styckpris.toFixed(2)} kr</ProductCardPrice>
                                </ProductCard>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <p>Rabatt: {order.Beställningsdetaljer?.[0]?.Rabatt}%</p>
                    <p className="font-bold">Totallt pris: {finalTotal?.toFixed(2)}kr</p>
                </section>
            ) : (
                <p>Laddar orderdetaljer...</p>
            )}
        </main>
    )
};