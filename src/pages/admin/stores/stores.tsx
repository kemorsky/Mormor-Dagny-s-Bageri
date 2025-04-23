import { useState } from "react";
import Menu from "../../../elements/menu/menu";
import { InputOrderDropdown } from "../../../components/ui/input";
import { deleteStore, lockStore } from "../../../lib/api";
import { Store } from "../../../types/types";
import { defaultStore } from "../../../constants/prefab-consts";
import { CardStore } from "../../../blocks/card";
import { CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson } from "../../../blocks/card-order-page";
import { useStores } from "../../../components/auth/StoreContext";
import AddStoreForm from "../../../elements/admin-store-form/admin-store-form";
import EditStoreForm from "../../../elements/admin-store-form/admin-edit-store-form";

export default function Stores() {
    const [selected, setSelected] = useState<Store | null>(null);
    const [query, setQuery] = useState<string>("");
    const [editingStore, setEditingStore] = useState<Store | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [newStore, setNewStore] = useState<Store>(() => ({ ...defaultStore }));
    const [storeLocked, setStoreLocked] = useState<number | null>(null);

    const { stores, setStores, searchStores, allStoresRef } = useStores();

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (newQuery.trim().length < 3) {
            setIsActive(false);
            setStores([]);
        } else {
            setIsActive(true);
            const results = searchStores(newQuery);
            setStores(results);
        }
    };

    const handleSelectedStore = (store: Store) => {
        setSelected(store);
        setQuery('');
        setIsActive(false)
    };

    const handleDeleteStore = async (ButikId: number) => {
        try {
            await deleteStore(ButikId)
            console.log(`Store with ID ${ButikId} deleted successfully`);
            setStores((prev) => { 
                const updated = prev?.filter(store => store.ButikId !== ButikId)
                allStoresRef.current = updated;
                return updated;
            });
            setSelected(null)
        } catch (error) {
            console.log("Error deleting store", error)
        }
    }; 

    const handleEditStore = (store: Store) => {
        setEditingStore({...store});
    };

    const handleLockStore = async (selected: Store) => {
        try {
            const storelocked = !selected.Låst
            setStoreLocked(selected.ButikId ?? 0)
            console.log(storelocked)

            await lockStore(storelocked, selected.ButikId ?? 0)

            setStores((prevStores) =>
                prevStores.map((s) =>
                  s.ButikId === selected.ButikId
                    ? { ...s, Låst: !selected.Låst }
                    : s
                )
              );
            setSelected(prev => prev?.ButikId === selected.ButikId ? { ...prev, Låst: !selected.Låst } as Store : prev);
            setStoreLocked(null);
        } catch (error) {
            console.error("Error locking store:", error);
        }
    }

    return (
        <main>
            <Menu />
            <div className="space-y-8">
            <section className="w-full inline-flex flex-col items-start justify-center gap-3 relative">
                    <form className="w-full border border-Branding-textAccent rounded bg-Branding-input inline-flex items-center justify-between px-4 py-3">
                        <InputOrderDropdown
                            value={query} 
                            onChange={handleQueryChange} 
                            />
                        <p onClick={() => { setSelected(null); setQuery(''); setIsActive(false)}} className="text-base cursor-pointer">Avbryt</p>
                    </form>
                    {isActive && stores && stores.length > 0 && (
                        <ul className="w-full max-h-[16rem] overflow-y-auto bg-Branding-input space-y-1 rounded-[0.5rem] divide-y divide-Branding-textAccent absolute top-[3.875rem]">
                            {stores.map((store) => (
                                <li
                                key={store.ButikId}
                                onClick={() => handleSelectedStore(store)}
                                className="block text-[1rem] leading-[1.125rem] font-inter font-semibold text-Branding-textPrimary cursor-pointer px-4 py-4 m-0"
                                >
                                    {store.ButikNamn}, {store.Besöksadress}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                {selected ? (
                    <section className="w-full inline-flex flex-col items-center justify-center gap-3">
                        <h2 className="self-start text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Kund information</h2>
                        <CardStore className="">
                            <CardStoreContent>
                                <CardStoreInformation>
                                    <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">{selected.ButikNamn} 
                                        <span className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]"> {selected.ButikNummer}</span>
                                    </p>
                                    <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.Besöksadress}</p>
                                </CardStoreInformation>
                                <CardStoreContacts>
                                    <CardStoreOwner>
                                        <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Butikägare: </p>
                                        <article className="w-full flex items-center justify-start gap-1.5">
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.ButikschefNamn}</p>
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.ButikschefTelefon}</p>
                                        </article>
                                    </CardStoreOwner>
                                    <CardStoreBreadperson>
                                        <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Brödansvarig: </p>
                                        <article className="w-full flex items-center justify-start gap-1.5">
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.BrödansvarigNamn}</p>
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{selected.BrödansvarigTelefon}</p>
                                        </article>
                                    </CardStoreBreadperson>
                                </CardStoreContacts>
                                <button onClick={() => selected.ButikId !== undefined && handleDeleteStore(selected.ButikId)}>Ta bort butiken</button>
                                <button onClick={() => selected.ButikId !== undefined && handleEditStore(selected)}>Radera butiken</button>
                                <label className="flex items-center gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        checked={selected.Låst ?? false}
                                        disabled={storeLocked === selected.ButikId}
                                        onChange={() => handleLockStore(selected)}
                                    />
                                    {selected.Låst ? "Locked" : "Unlocked"}
                                </label>
                            
                                {editingStore?.ButikId === selected.ButikId && (
                                    <EditStoreForm
                                        isLoading={isLoading}
                                        selected={selected}
                                        setSelected={setSelected}
                                        editingStore={editingStore}
                                        setEditingStore={setEditingStore}
                                         />
                                )}
                            
                            </CardStoreContent>                                                             
                        </CardStore>
                    </section>
                ) : (
                    <div className="w-full inline-flex flex-col items-start justify-center gap-3">
                        <h2 className="text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Kund information</h2>
                        <CardStore className="w-full h-full">
                            <CardStoreContent>
                                <CardStoreInformation>
                                    <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">Ingen kund valt än</p>
                                </CardStoreInformation>
                            </CardStoreContent>
                        </CardStore>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-center justify-center">
                <h2>Lägg till en butik</h2>
                <AddStoreForm
                    newStore={newStore}
                    setNewStore={setNewStore}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                 />
            </div>
        </main>
    )
}