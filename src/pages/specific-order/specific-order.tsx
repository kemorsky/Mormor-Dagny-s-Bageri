import { useSpecificOrderPage } from "../../hooks/useSpecificOrder"
import Menu from "../../elements/menu/menu";
import { useAuth } from "../../components/auth/AuthContext";
import { ProductCard, ProductCardName, ProductCardAmount, ProductCardPrice, ProductCardTotalPrice } from "../../blocks/card";
import { CardStore, CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson } from "../../blocks/card-order-page";
import { formatDate } from "../../lib/formatDate";
import { ImCross } from "react-icons/im";
import { Main, Wrapper } from "../../blocks/wrappers";
import { Button } from "../../components/ui/button-shadcn";

export default function SpecificOrder() {
  const {
    order, products, isEditing, isCompletingOrder, editedDetails, editedDate, message,
    newDetail, finalTotal, setIsCompletingOrder, setEditedDate, setNewDetail,
    handleEdit, handleCancelEdit, handleSubmitDate, handleSubmit, handleAmountChange, handleDelete,
    handleDeleteOrder, handleAddDetail,} = useSpecificOrderPage();

  const { permissions } = useAuth();
  const { canEditOrder, canDeleteOrder, canEditDeliveryDate } = permissions;

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <Main>
      <Wrapper>
        <Menu />
        <section className="w-full max-w-[33.792rem] inline-flex flex-col items-start justify-center gap-3">
          <h1 className="self-start text-Branding-textHeading text-2xl font-open-sans font-semibold">Beställning #{order.BeställningId}</h1>
          <section className="w-full max-w-[33.792rem] inline-flex flex-col items-start justify-center gap-3 relative">
            <CardStore>
              <CardStoreContent>
                  <CardStoreInformation>
                      <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">Beställningsdatum:
                          <span className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]"> {formatDate(order.Beställningsdatum)}</span>
                      </p>
                      {editedDate ? (
                        <>
                        <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem] flex items-center justify-center">Leveransdatum:
                          <input
                              className="ml-1 bg-Branding-input border border-Branding-textAccent rounded p-1 font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]"
                              type="text"
                              value={editedDate}
                              onChange={(e) => setEditedDate(e.target.value)}
                            />
                        </p>
                        <div className="space-x-2.5 self-center mt-1">
                          <Button variant='manage' size='admin' onClick={handleSubmitDate}>Spara</Button>
                          <Button variant='delete' size='admin' onClick={() => setEditedDate('')}>Avbryt</Button>
                        </div>
                        </>
                      ) : (
                        <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">Leveransdatum:
                          <span className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]"> {formatDate(order.PreliminärtLeveransdatum)}</span>
                        </p>
                      )}
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
            {(canEditOrder || canDeleteOrder || canEditDeliveryDate) && (
              <div className="self-center flex gap-3 flex-wrap">
                {canEditOrder && !isEditing && <Button variant='manage' size='admin' onClick={handleEdit}>Ändra beställningsdetaljer</Button>}
                {canEditOrder && isEditing && (
                  <>
                    <Button variant='manage' size='admin' onClick={handleSubmit}>Spara</Button>
                    <Button variant='delete' size='admin' onClick={handleCancelEdit}>Avbryt</Button>
                  </>
                )}
                {canEditDeliveryDate && (
                  <Button variant='manage' size='admin' onClick={() => setEditedDate(order.PreliminärtLeveransdatum ?? '')}>
                    Ändra beställningsdatum
                  </Button>
                )}
                {canDeleteOrder && !isEditing && (
                  <Button variant='delete' size='admin' onClick={() => handleDeleteOrder(order.BeställningId ?? 0)}>Ta bort beställningen</Button>
                )}
              </div>
            )}
            <h2 className="self-start text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Kund Information</h2>
            <CardStore>
              <CardStoreContent>
                  <CardStoreInformation>
                      <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">{order.Butik?.ButikNamn} 
                          <span className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]"> {order.Butik?.ButikNummer}</span>
                      </p>
                      <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{order.Butik?.Besöksadress}</p>
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

          <section className="w-full max-w-[33.792rem] inline-flex flex-col items-start justify-center gap-3">
            {canEditOrder ? (
                <article className="flex items-center justify-center gap-3">
                  <h2 className="self-center text-Branding-textHeading text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Beställda produkter</h2>
                  {isCompletingOrder ? (
                    <Button variant='delete' size='admin' onClick={() => setIsCompletingOrder(false)}>Avbryt</Button >
                    ) : (
                    <Button variant='manage' size='admin' onClick={() => setIsCompletingOrder(true)}>Komplettera</Button>
                    )}
                </article>
                ) : (
                <h2 className="self-start text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Beställda produkter</h2>
            )}
            <div className="w-full bg-Branding-cardPrimary shadow-[0px_0px_8px_4px_rgba(180,180,180,0.15)] flex flex-col gap-3 p-3 rounded-xl">
              <ul className="w-full space-y-4">
                {order.Beställningsdetaljer.map((product, index) => (
                  <li key={index}>
                    <ProductCard className={`${isEditing ? 'items-center' : ''}`}>
                      <ProductCardName>{product.Produkt?.Namn}</ProductCardName>
                      <ProductCardPrice>{product.Produkt?.Baspris} kr</ProductCardPrice>
                      {isEditing ? (
                        <>
                          <ProductCardAmount>
                              <input
                                type="text"
                                className="font-inter text-center bg-Branding-input border border-Branding-textAccent text-Branding-textPrimary rounded px-2 py-1 max-w-12 h-[2.625rem]"
                                value={editedDetails.find(item => item.BeställningsdetaljId === product.BeställningsdetaljId)?.Antal?.toString() ?? ''}
                                onChange={(e) =>
                                  handleAmountChange(product.BeställningsdetaljId ?? 0, e.target.value)
                                }
                              />                         
                          </ProductCardAmount>
                          <ProductCardTotalPrice>
                              <span className="text-Branding-textSecondary">Pris: </span> 
                              {product.Styckpris.toFixed(2)} kr
                          </ProductCardTotalPrice>
                          <Button variant='deleteProduct' size='pagination' onClick={() => handleDelete(product.BeställningsdetaljId ?? 0)}><ImCross className="text-[0.875rem]"/></Button>
                        </>
                      ) : (
                        <>
                          <ProductCardAmount>Antal: {product.Antal}</ProductCardAmount>
                          <ProductCardTotalPrice>
                              <span className="text-Branding-textSecondary">Pris: </span> 
                              {product.Styckpris.toFixed(2)} kr
                          </ProductCardTotalPrice>
                        </>
                      )}
                    </ProductCard>
                  </li>
                ))}
              </ul>
              {isCompletingOrder && (
                  <div className="flex flex-col border-t py-3 gap-3">
                      <h2 className="text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Lägg till en produkt</h2>
                      <div className="flex flex-col gap-3">
                          <select
                              className="w-full max-w-[16.896rem] bg-Branding-input border border-Branding-textAccent text-Branding-textPrimary font-inter font-medium text-[0.875rem] sm:text-[1rem] rounded-lg focus:border-white focus:outline-none block p-3"
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
                              <option>Välj produkt</option>
                              {products.map((product) => (
                                  <option key={product.ProduktId} value={product.ProduktId}>
                                    {product.Namn} – {product.Baspris} kr
                                  </option>
                              ))}
                          </select>
                          <div className="flex gap-3 items-center">
                            <input
                                type="text"
                                className="w-12 h-10 bg-Branding-input border border-Branding-textAccent text-Branding-textPrimary text-center font-inter font-medium text-[0.875rem] sm:text-[1rem] rounded-lg focus:border-white focus:outline-none block p-3 "
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
                            <p className="font-inter text-Branding-textPrimary">Pris: {newDetail.Styckpris.toFixed(2)} kr</p>
                            {message ? (
                                <p className="font-inter text-red-500">{message}</p>
                            ): (null)}
                          </div>
                          <Button variant='proceed' size='smaller' className="w-[12rem]" onClick={handleAddDetail}>Lägg till</Button>
                      </div>
                  </div>
              )}
              <hr className="bg-white h-[1px] w-full"/> 
              <section className="self-end flex flex-col items-end gap-2">
                <p className="font-inter text-Branding-textPrimary">Rabatt: {order.Beställningsdetaljer?.[0]?.Rabatt}%</p>
                <p className="font-inter text-Branding-textPrimary">Finallt pris: {finalTotal?.toFixed(2)} kr</p>
              </section>
            </div>
          </section>
        </section>  
      </Wrapper>
    </Main>
  );
}

