import { useSpecificOrderPage } from "../../hooks/useSpecificOrder"
import Menu from "../../elements/menu/menu";
import { useAuth } from "../../components/auth/AuthContext";
import { ProductCard, ProductCardName, ProductCardAmount, ProductCardPrice } from "../../blocks/card";
import { CardStore, CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson } from "../../blocks/card-order-page";
import { formatDate } from "../../lib/formatDate";

export default function SpecificOrder() {
  const {
    order, products, isEditing, isCompletingOrder, editedDetails, editedDate,
    newDetail, finalTotal, setIsCompletingOrder, setEditedDate, setNewDetail,
    handleEdit, handleCancelEdit, handleSubmitDate, handleSubmit, handleAmountChange, handleDelete,
    handleDeleteOrder, handleAddDetail,} = useSpecificOrderPage();

  const { permissions } = useAuth();
  const { canEditOrder, canDeleteOrder, canEditDeliveryDate } = permissions;

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
              <strong>Beställningsdatum:</strong> {formatDate(order.Beställningsdatum)}
            </CardStoreOwner>
            <CardStoreOwner>
              <strong>Leveransdatum:</strong>
              {editedDate ? (
                <input
                  type="text"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                />
              ) : (
                <span>{formatDate(order.PreliminärtLeveransdatum)}</span>
              )}
              {editedDate && (
                <div>
                  <button onClick={handleSubmitDate}>Spara</button>
                  <button onClick={() => setEditedDate('')}>Avbryt</button>
                </div>
              )}
            </CardStoreOwner>
            <CardStoreOwner>
              <strong>Beställare:</strong> {order.Beställare}
            </CardStoreOwner>
            <CardStoreOwner>
              <strong>Säljare:</strong> {order.Säljare}
            </CardStoreOwner>
          </CardStoreContent>
        </CardStore>

        {(canEditOrder || canDeleteOrder || canEditDeliveryDate) && (
          <div className="my-4 flex gap-2 flex-wrap">
            {canEditOrder && !isEditing && <button onClick={handleEdit}>Ändra beställningsdetaljer</button>}
            {canEditOrder && isEditing && (
              <>
                <button onClick={handleSubmit}>Spara</button>
                <button onClick={handleCancelEdit}>Avbryt</button>
              </>
            )}
            {canDeleteOrder && (
              <button onClick={() => handleDeleteOrder(order.BeställningId ?? 0)}>Ta bort beställningen</button>
            )}
            {canEditDeliveryDate && (
              <button onClick={() => setEditedDate(order.PreliminärtLeveransdatum ?? '')}>
                Ändra beställningsdatum
              </button>
            )}
          </div>
        )}

        <CardStore className="">
          <CardStoreContent>
            <CardStoreInformation>
              <p className="font-semibold">{order.Butik?.ButikNamn}
                <span className="text-Branding-textPrimary"> {order.Butik?.ButikNummer}</span>
              </p>
              <p className="text-Branding-textSecondary">{order?.Butik?.Besöksadress}</p>
            </CardStoreInformation>
            <CardStoreContacts>
              <CardStoreOwner>
                <p>Butikägare:</p>
                <article className="flex gap-1.5">
                  <p>{order.Butik?.ButikschefNamn}</p>
                  <p>{order.Butik?.ButikschefTelefon}</p>
                </article>
              </CardStoreOwner>
              <CardStoreBreadperson>
                <p>Brödansvarig:</p>
                <article className="flex gap-1.5">
                  <p>{order.Butik?.BrödansvarigNamn}</p>
                  <p>{order.Butik?.BrödansvarigTelefon}</p>
                </article>
              </CardStoreBreadperson>
            </CardStoreContacts>
          </CardStoreContent>
        </CardStore>
      </section>

      <section className="mt-6">
        {canEditOrder ? (
            <article>
                <h2 className="text-2xl">Beställda produkter</h2>
                {isCompletingOrder ? (
                <button onClick={() => setIsCompletingOrder(false)}>Avbryt</button>
                ) : (
                <button onClick={() => setIsCompletingOrder(true)}>Redigera</button>
                )}
            </article>
            ) : (
            <h2 className="text-2xl">Beställda produkter</h2>
        )}

        <ul className="space-y-4 mt-4">
          {order.Beställningsdetaljer.map((product, index) => (
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
                        editedDetails.find(item => item.BeställningsdetaljId === product.BeställningsdetaljId)?.Styckpris?.toFixed(2)
                      } kr
                    </ProductCardPrice>
                    <button onClick={() => handleDelete(product.BeställningsdetaljId ?? 0)}>Ta bort</button>
                  </>
                ) : (
                  <>
                    <ProductCardAmount>Antal: {product.Antal}</ProductCardAmount>
                    <ProductCardPrice>Totaltpris: {product.Styckpris.toFixed(2)} kr</ProductCardPrice>
                  </>
                )}
              </ProductCard>
            </li>
          ))}
        </ul>

        {isCompletingOrder && (
            <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold">Lägg till produkt</h3>
                <div className="flex flex-col gap-2 max-w-md">
                    <select
                        className="border p-2"
                        value={newDetail.ProduktId}
                        onChange={(e) => {
                            const selectedId = parseInt(e.target.value);
                            const selectedProduct = products.find(p => p.ProduktId === selectedId);
                            const basePrice = selectedProduct?.Baspris || 0;

                            setNewDetail({
                                ...newDetail,
                                ProduktId: selectedId,
                                Styckpris: basePrice * newDetail.Antal,
                            });
                        }}
                    >
                        <option value={0}>Välj produkt</option>
                        {products.map((product) => (
                            <option key={product.ProduktId} value={product.ProduktId}>
                                {product.Namn} – {product.Baspris} kr
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        className="border p-2"
                        placeholder="Antal"
                        value={newDetail.Antal}
                        onChange={(e) => {
                            const amount = parseFloat(e.target.value) || 0;
                            const selectedProduct = products.find(p => p.ProduktId === newDetail.ProduktId);
                            const basePrice = selectedProduct?.Baspris || 0;

                            setNewDetail({
                                ...newDetail,
                                Antal: amount,
                                Styckpris: basePrice * amount
                            });
                        }}
                    />

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleAddDetail}
                    >
                        Lägg till
                    </button>
                </div>
            </div>
        )}

        <p className="mt-4">Rabatt: {order.Beställningsdetaljer?.[0]?.Rabatt}%</p>
        <p className="font-bold">Totalt pris: {finalTotal?.toFixed(2)} kr</p>
      </section>
    </main>
  );
}

