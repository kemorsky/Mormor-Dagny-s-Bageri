import { useState, useEffect } from "react"
import Menu from "../../elements/menu/menu"
import { pushOrder } from "../../lib/api"
import { OrderDetails } from "../../types/types"
import { useLocation, useNavigate } from "react-router"
import { ProductCard, ProductCardName, ProductCardPrice, ProductCardAmount  } from "../../blocks/card"
import { CardStore, CardStoreBreadperson, CardStoreContacts, CardStoreContent, CardStoreInformation, CardStoreOwner } from "../../blocks/card-order-page"
import { useStores } from "../../components/auth/StoreContext"
import { useProducts } from "../../components/auth/ProductContext"

export default function OrderDetailsPage() {
    const [details, setDetails] = useState<OrderDetails[]>([]);
    const [loading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const { state } = useLocation();
    const order = state?.order

    const { getStore } = useStores()
    const { getProduct } = useProducts()
    const store = getStore(order.ButikId)
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

    console.log(order)

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => { // TODO implementent PUT method of order details alteration
        e.preventDefault();

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const createdOrder = await pushOrder(order)
            console.log(createdOrder)
            setIsLoading(false)
            navigate(`/confirmation-page/${createdOrder.BeställningId}`, {state: {order: createdOrder}});
        } catch (error) {
            console.error("Error pushing order:", error);
        }
    }

    return (
        <main>
            <Menu />
            <h1>Bekräfta beställning</h1>
            <form action="" onSubmit={handleSubmit}>
                <section>
                    <h2>Orderinformation</h2>
                    <CardStore className="">
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
                    <p><strong>Beställare:</strong> {order.Beställare}</p>
                    <p><strong>Säljare:</strong> {order.Säljare}</p>
                    <p><strong>Datum:</strong> {order.Beställningsdatum}</p>
                    <p><strong>Leveransdatum:</strong> {order.PreliminärtLeveransdatum}</p>
                </section>
                <section>
                    <h2>Produkter</h2>
                    {details ? (
                    <div> 
                        <ul>
                            {products.map((product, index) => (
                            <li key={index}>
                                <ProductCard>
                                    <ProductCardName>{product?.Namn}</ProductCardName>
                                    <ProductCardAmount>Antal: {details[index].Antal}</ProductCardAmount>
                                    <ProductCardPrice>Pris: {product?.Baspris}</ProductCardPrice>
                                    <ProductCardPrice>Tottalt: {details[index].Styckpris}</ProductCardPrice>
                                    <ProductCardPrice>Rabatt: {details[index].Rabatt}</ProductCardPrice>
                                </ProductCard>
                            </li>
                            ))}
                        </ul>
                    </div>
                    ) : (
                    <p>Laddar orderdetaljer...</p>
                    )}
                </section>
                <button>Ändra detaljer</button>
                <button className={`${loading ? 'cursor-not-allowed' : ''}`} type='submit'>Lägg till beställningen</button>
            </form>
        </main>
    )
}