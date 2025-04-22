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
                    {details.length > 0 ? (
                    <div>
                        <ul>
                            {products.map((product, index) => (
                                <li key={index}>
                                <ProductCard>
                                    <ProductCardName>{product?.Namn}</ProductCardName>
                                    {edit ? (
                                    <>
                                        <label className="block my-1">
                                            Antal:
                                            <input
                                                type="text"
                                                value={details[index].Antal}
                                                onChange={(e) => {
                                                    const updated = [...details];
                                                    const newAntal = parseInt(e.target.value) || 0;
                                                    updated[index].Antal = newAntal
                                                    setDetails(updated);
                                                }}
                                                className="border border-gray-300 rounded p-1 ml-2 w-20"
                                            />
                                        </label>
                                        <p className="text-sm text-gray-600">Styckpris: {details[index].Antal * (product?.Baspris ?? 0)} kr</p>
                                    </>
                                    ) : (
                                    <>
                                        <ProductCardAmount>Antal: {details[index].Antal}</ProductCardAmount>
                                        <ProductCardPrice>Pris: {product?.Baspris}</ProductCardPrice>
                                        <ProductCardPrice>Tottalt: {details[index].Antal * (product?.Baspris ?? 0)}</ProductCardPrice>
                                    </>
                                    )}
                                </ProductCard>
                                </li>
                            ))}
                        </ul>
                    </div>
                    ) : (
                    <p>Laddar orderdetaljer...</p>
                    )}
                </section>
                <div className="mt-4">
                    <p>Totalt innan rabatt: {totalBeforeDiscount.toFixed(2)} kr</p>
                    {edit ? (
                         <label className="block my-1">
                            Rabatt:
                            <input
                                type="text"
                                value={orderDiscount}
                                onChange={(e) => {
                                    const updated = parseFloat(e.target.value) || 0;
                                    setOrderDiscount(updated);
                                }}
                                className="border border-gray-300 rounded p-1 ml-2 w-20"
                            />
                        </label>
                    ) : (
                        <p>Rabatt ({orderDiscount}%): -{discountAmount.toFixed(2)} kr</p>
                    )}
                    <p className="font-bold">Att betala: {finalTotal.toFixed(2)} kr</p>
                </div>
                <button type="button" onClick={() => setEdit(prev => !prev)}>
                    {edit ? "Avsluta redigering" : "Ändra detaljer"}
                </button>
                <button className={`${loading ? 'cursor-not-allowed' : ''}`} type='submit'>Lägg till beställningen</button>
            </form>
        </main>
    )
}