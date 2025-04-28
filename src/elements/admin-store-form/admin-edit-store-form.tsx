import { CardStore, CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson } from "../../blocks/card-order-page";
import { useStores } from "../../components/auth/StoreContext";
import { editStore } from "../../lib/api";
import { Store } from "../../types/types";

type EditStoreProps = {
    isLoading: boolean,
    selected: Store,
    setSelected: React.Dispatch<React.SetStateAction<Store | null>>,
    editingStore: Store | null,
    setEditingStore: React.Dispatch<React.SetStateAction<Store | null>>,
}

const EditStoreForm: React.FC<EditStoreProps> = ({
    isLoading,
    selected,
    setSelected,
    editingStore,
    setEditingStore,
}) => {

    const { setStores, allStoresRef } = useStores();
    
    const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingStore) {
            const success = await editStore(editingStore)
            if (success) {
                setStores((prev) => {
                    const updated = prev.map((store) =>
                        store.ButikId === editingStore.ButikId
                            ? { ...store, ...editingStore }
                            : store
                    )
                    allStoresRef.current = updated;
                    return updated;
                });
                setSelected(editingStore);
                setEditingStore(null);
            }
        }
    }

    return (
        <form onSubmit={handleSaveEdit} className="self-stretch inline-flex flex-col justify-start items-start gap-1.5">
                <CardStore className="min-h-[17.6875rem] gap-3 justify-between">
                        <CardStoreContent className="gap-3">
                                <CardStoreInformation>
                                        <section className="space-x-2">
                                                <input type="text"
                                                        className="p-2 rounded-lg border border-white/65 font-semibold font-inter text-[1rem] leading-[1.1875rem] bg-Branding-input"
                                                        value={editingStore?.ButikNamn}
                                                        placeholder="Butik Namn"
                                                        onChange={(e) => setEditingStore({ ...selected, ...editingStore, ButikNamn: e.target.value})} />
                                                <input type="text"
                                                        className="p-2 rounded-lg border border-white/65 max-w-[5rem] font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem] bg-Branding-input"
                                                        placeholder="Butik Nummer"
                                                        value={editingStore?.ButikNummer}
                                                        onChange={(e) => setEditingStore({ ...selected, ...editingStore, ButikNummer: e.target.value })}/>
                                        </section>
                                                <input type="text"
                                                        className="p-2 rounded-lg border border-white/65 font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem] w-full max-w-[18rem] bg-Branding-input"
                                                        value={editingStore?.Besöksadress}
                                                        placeholder="Besökadress"
                                                        onChange={(e) => setEditingStore({ ...selected, ...editingStore, Besöksadress: e.target.value })} />
                                </CardStoreInformation>
                                <CardStoreContacts>
                                        <CardStoreOwner className="gap-1.5">
                                                <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Butikägare: </p>
                                                <input type="text"
                                                        className="w-full max-w-[10rem] bg-Branding-input p-2 rounded-lg border border-white/65 font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]"
                                                        value={editingStore?.ButikschefNamn}
                                                        placeholder="Butikchefs Namn"
                                                        onChange={(e) => setEditingStore({ ...selected, ...editingStore, ButikschefNamn: e.target.value })} />
                                                <input type="text"
                                                        className="w-full max-w-[10rem] bg-Branding-input p-2 rounded-lg border border-white/65 font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]"
                                                        value={editingStore?.ButikschefTelefon}
                                                        placeholder="Butikchefs Telefon"
                                                        onChange={(e) => setEditingStore({ ...selected, ...editingStore, ButikschefTelefon: e.target.value })} />
                                        </CardStoreOwner>
                                        <CardStoreBreadperson className="gap-1.5">
                                                <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Brödansvarig: </p>
                                                <input type="text"
                                                        className="w-full max-w-[10rem] bg-Branding-input p-2 rounded-lg border border-white/65  font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]"
                                                        value={editingStore?.BrödansvarigNamn}
                                                        placeholder="Butikchefs Namn"
                                                        onChange={(e) => setEditingStore({ ...selected, ...editingStore, BrödansvarigNamn: e.target.value })} />
                                                <input type="text"
                                                        className="w-full max-w-[10rem] bg-Branding-input p-2 rounded-lg border border-white/65 font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]"
                                                        value={editingStore?.BrödansvarigTelefon}
                                                        placeholder="Butikchefs Telefon"
                                                        onChange={(e) => setEditingStore({ ...selected, ...editingStore, BrödansvarigTelefon: e.target.value })} />
                                        </CardStoreBreadperson>
                                </CardStoreContacts>
                                <CardStoreBreadperson className="gap-1.5">
                                        <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Fakturaadress: </p>
                                        <input type="text"
                                                className="bg-Branding-input p-2 rounded-lg border border-white/65 font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]"
                                                value={editingStore?.Fakturaadress}
                                                placeholder="Fakturaadress"
                                                onChange={(e) => setEditingStore({ ...selected, ...editingStore, Fakturaadress: e.target.value })} />
                                </CardStoreBreadperson>
                        </CardStoreContent>   
                        <section className="flex gap-3 self-end">
                                <button type="submit" className="bg-orange-500 rounded-lg px-4 py-2">Spara</button>
                                <button className="bg-blue-500 rounded-lg px-4 py-2" onClick={() => setEditingStore(null)}>Avbryt</button>
                        </section>  
                        {isLoading ?? <p>Loading...</p>}                                                        
                </CardStore>
                        
        </form>
    )
}

export default EditStoreForm