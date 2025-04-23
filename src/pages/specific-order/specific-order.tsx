import { useState, useEffect } from "react";
import { deleteOrder, deleteOrderDetails, editOrderDeliveryDate, editOrderDetails, fetchSpecificOrder } from "../../lib/api";
import { formatDate } from "../../lib/formatDate";
import { Order, OrderDetails } from "../../types/types";
import { useNavigate, useParams } from 'react-router';
import { CardStore, ProductCard, ProductCardName, ProductCardAmount, ProductCardPrice } from "../../blocks/card";
import { CardStoreContent, CardStoreOwner, CardStoreInformation, CardStoreContacts, CardStoreBreadperson } from "../../blocks/card-order-page";
import Menu from "../../elements/menu/menu";
import { useAuth } from "../../components/auth/AuthContext";

export default function SpecificOrder() {
    const [order, setOrder] = useState<Order>();
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState<OrderDetails[]>([]);
    const [editedDate, setEditedDate] = useState(order?.PreliminärtLeveransdatum || '');
    const { id = '' } = useParams();

    const { currentUser } = useAuth();

    const navigate = useNavigate();

    const userType = currentUser?.Roll;
    const canEditDeleteOrder = userType === "Admin" || userType === "Säljare";
    const canEditDeliveryDate = userType === "Planerare";

    useEffect(() => {
        const getOrder = async () => {
            const orderId = parseInt(id);
            try {
                const order = await fetchSpecificOrder(orderId);
                setOrder(order);
                setEditedDetails(order.Beställningsdetaljer || []);
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

    const handleSubmitDate = async () => {
        if (editedDate) {
            const updateDTO = {
                PreliminärtLeveransdatum: editedDate
            }
            const success = await editOrderDeliveryDate(order?.BeställningId ?? 0, updateDTO);
            if (success) {
                if (success) {
                    setOrder((prevDate) => ({
                        ...prevDate!,
                        PreliminärtLeveransdatum: editedDate,
                    }));
                    setEditedDate('')
                }
            }
        }
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedDetails(order?.Beställningsdetaljer || []);
    };

    const handleAmountChange = (id: number, value: string) => {
        const numericValue = value === '' ? 0 : parseInt(value);
        setEditedDetails((prevDetails) =>
            prevDetails.map((detail) => {
                if (detail.BeställningsdetaljId === id) {
                    const basePrice = detail.Produkt?.Baspris || 0;
                    return {
                        ...detail,
                        Antal: value === '' ? 0 : numericValue,
                        Styckpris: numericValue * basePrice
                    };
                }
                return detail;
            })
        );
    };

    const handleDelete = async (BeställningsdetaljId: number) => {
        try {
          const orderDetailsToDelete = editedDetails.find((detail) => detail.BeställningsdetaljId === BeställningsdetaljId);
          if (orderDetailsToDelete) {
            await deleteOrderDetails([orderDetailsToDelete]);
          }
          setOrder((prev) => prev ? {
            ...prev,
            Beställningsdetaljer: prev.Beställningsdetaljer.filter((orderDetail) => orderDetail.BeställningsdetaljId !== BeställningsdetaljId),
          } : prev);

          setEditedDetails((prevDetails) =>
            prevDetails.filter((detail) => detail.BeställningsdetaljId !== BeställningsdetaljId)
        );
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      }

      const handleDeleteOrder = async (BeställningId: number) => {
        const confirmDelete = window.confirm("Är du säker på att du vill ta bort hela beställningen?");
        if (!confirmDelete) {
            console.log("Användaren avbröt borttagningen.");
            return;
        }
    
        try {
            await deleteOrder(BeställningId);
            console.log("Deleted order with id:", BeställningId);
            navigate('/');
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };
    

    const handleSubmit = async () => {
        if (editedDetails) {
            const success = await editOrderDetails(editedDetails);
            if (success) {
                setOrder((prevOrder) => ({
                    ...prevOrder!,
                    Beställningsdetaljer: editedDetails,
                }));
                setIsEditing(false);
            }
        }
    };

    if (!order) {
        return <div>Loading...</div>;
    }

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
                            <strong>Leveransdatum:</strong>
                            {editedDate ? (
                                <input type="text" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} />
                            ) : (
                                <span>{formatDate(order.PreliminärtLeveransdatum)}</span>
                            )}
                            {editedDate ? (
                                <div>
                                <button onClick={handleSubmitDate}>Spara</button>
                                <button onClick={() => setEditedDate('')}>Avbryt</button>
                                </div>
                            ) : (
                                null
                            )}
                        </CardStoreOwner>
                        <CardStoreOwner>
                            <strong>Beställare:</strong>{order.Beställare}
                        </CardStoreOwner>
                        <CardStoreOwner>
                            <strong>Säljare:</strong>{order.Säljare}
                        </CardStoreOwner>
                    </CardStoreContent>
                </CardStore>
                {(canEditDeleteOrder || canEditDeliveryDate) && (
                    <div>
                        {canEditDeleteOrder && !isEditing && (
                        <>
                            <button onClick={handleEdit}>Ändra beställningen</button>
                            <button onClick={() => order.BeställningId !== undefined && handleDeleteOrder(order.BeställningId)}>Ta bort beställningen</button>
                        </>
                        )}
                        {canEditDeleteOrder && isEditing && (
                        <>
                            <button type="submit" onClick={handleSubmit}>Spara</button>
                            <button onClick={handleCancelEdit}>Avbryt</button>
                        </>
                        )}
                        {canEditDeliveryDate && (
                                <button onClick={() => setEditedDate(order.PreliminärtLeveransdatum ?? '')}>Ändra beställningsdatum</button>
                        )}
                    </div>
                )}
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
            {order?.Beställningsdetaljer ? (
                <section>
                    <h2 className="text-2xl">Beställda produkter</h2>
                    <div>
                        <ul>
                            {order?.Beställningsdetaljer?.map((product, index) => (
                                <li key={index}>
                                    <ProductCard>
                                        <ProductCardName>{product.Produkt?.Namn}</ProductCardName>
                                        <ProductCardPrice>{product.Produkt?.Baspris} kr</ProductCardPrice>
                                        {isEditing ? (
                                        <>
                                            <ProductCardAmount>
                                                <input
                                                    type="text"
                                                    value={editedDetails.find(item => item.BeställningsdetaljId === product.BeställningsdetaljId)?.Antal?.toString() ?? ''}
                                                    onChange={(e) =>
                                                        handleAmountChange(product.BeställningsdetaljId ?? 0, e.target.value)
                                                    }
                                                />
                                            </ProductCardAmount>
                                            <ProductCardPrice>
                                                Totaltpris: {
                                                    isEditing
                                                        ? editedDetails.find(item => item.BeställningsdetaljId === product.BeställningsdetaljId)?.Styckpris?.toFixed(2)
                                                        : product.Styckpris.toFixed(2)
                                                } kr
                                            </ProductCardPrice>
                                            <button onClick={() => {handleDelete(product.BeställningsdetaljId ?? 0)}}>Ta bort</button>
                                        </>
                                        ) : (
                                        <>
                                            <ProductCardAmount>Antal: {product.Antal}</ProductCardAmount>
                                            <ProductCardPrice>Tottaltpris: {product.Styckpris.toFixed(2)} kr</ProductCardPrice>
                                        </>
                                        )}
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
    );
}
