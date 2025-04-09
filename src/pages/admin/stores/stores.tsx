import { useState } from "react";
import Menu from "../../../elements/menu/menu";
import { InputOrderDropdown } from "../../../components/ui/input";
import { addStore, deleteStore } from "../../../lib/api";
import { Store } from "../../../types/types";
import { CardStore } from "../../../blocks/card";
import { CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson } from "../../../blocks/card-order-page";
import { useStores } from "../../../components/auth/StoreContext";

export default function Stores() {
    const [selected, setSelected] = useState<Store | null>(null);
    const [query, setQuery] = useState<string>("");
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [newStore, setNewStore] = useState<Store>({
        ButikNummer: '',
        ButikNamn: '',
        Besöksadress: '',
        BrödansvarigNamn: '',
        BrödansvarigTelefon: '',
        ButikschefNamn: '',
        ButikschefTelefon: '',
        Fakturaadress: '',
        Låst: false,
        Telefonnummer: ''
      });

    const { stores, setStores, searchStores } = useStores()

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
        console.log("Store selected:", store)
        setSelected(store);
        setQuery('');
        setIsActive(false)
    };

    const handleClearInput = () => {
        setSelected(null);
        setQuery('');
        setIsActive(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            await addStore(newStore)
            console.log("added new store:", newStore)
            setStores((prevStores) => [...(prevStores || []), newStore]);
            setNewStore({
                ButikNummer: '',
                ButikNamn: '',
                Besöksadress: '',
                BrödansvarigNamn: '',
                BrödansvarigTelefon: '',
                ButikschefNamn: '',
                ButikschefTelefon: '',
                Fakturaadress: '',
                Låst: false,
                Telefonnummer: ''
            });
        } catch (error) {
            console.log("Failed to add store", error)
        }
    }

    const handleDeleteStore = async (ButikId: number) => { // TODO fix store array not refreshing upon deleting a store
        try {
            await deleteStore(ButikId)
            console.log(`Store with ID ${ButikId} deleted successfully`);
            setStores((prevStores) => prevStores?.filter(store => store.ButikId !== ButikId) || []);
            setSelected(null)
        } catch (error) {
            console.log("Error deleting store", error)
        }
    }; 

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
                        <p onClick={handleClearInput} className="text-base cursor-pointer">Avbryt</p>
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
                <form className="inline-flex flex-col items-center justify-center gap-3" onSubmit={handleSubmit}>
                    <input type="text"
                            className=""
                            placeholder="Butik Nummer"
                            value={newStore.ButikNummer}
                            onChange={(e) => setNewStore({ ...newStore, ButikNummer: e.target.value })}
                             />
                    <input type="text"
                            className=""
                            value={newStore.ButikNamn}
                            placeholder="Butik Namn"
                            onChange={(e) => setNewStore({ ...newStore, ButikNamn: e.target.value })} />
                    <input type="text"
                            className=""
                            value={newStore.Besöksadress}
                            placeholder="Besökadress"
                            onChange={(e) => setNewStore({ ...newStore, Besöksadress: e.target.value })} />
                    <input type="text"
                            className=""
                            value={newStore.BrödansvarigNamn}
                            placeholder="Brödansvarig Namn"
                            onChange={(e) => setNewStore({ ...newStore, BrödansvarigNamn: e.target.value })} />
                    <input type="text"
                            className=""
                            value={newStore.BrödansvarigTelefon}
                            placeholder="Brödansvarig Telefon"
                            onChange={(e) => setNewStore({ ...newStore, BrödansvarigTelefon: e.target.value })} />
                    <input type="text"
                            className=""
                            value={newStore.ButikschefNamn}
                            placeholder="Butikchefs Namn"
                            onChange={(e) => setNewStore({ ...newStore, ButikschefNamn: e.target.value })} />
                    <input type="text"
                            className=""
                            value={newStore.ButikschefTelefon}
                            placeholder="Butikchefs Telefon"
                            onChange={(e) => setNewStore({ ...newStore, ButikschefTelefon: e.target.value })} />
                    <input type="text"
                            className=""
                            value={newStore.Fakturaadress}
                            placeholder="Fakturaadress"
                            onChange={(e) => setNewStore({ ...newStore, Fakturaadress: e.target.value })} />
                    <input type="checkbox"
                            className="" />
                    <input type="text"
                            className=""
                            value={newStore.Telefonnummer}
                            placeholder="Butik Namn"
                            onChange={(e) => setNewStore({ ...newStore, Telefonnummer: e.target.value })} />
                    <button type="submit">Lägg till butiken</button>
                    {isLoading ?? <p>Loading...</p>}
                </form>
            </div>
        </main>
    )
}