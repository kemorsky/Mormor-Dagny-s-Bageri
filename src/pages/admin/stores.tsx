import { useState, useEffect } from "react";
import Menu from "../../elements/menu/menu";
import { fetchStores, addStore, deleteStore } from "../../lib/api";
import { Store } from "../../types/types";
import { CardStore } from "../../blocks/card";
import { CardStoreContent, CardStoreInformation, CardStoreContacts, CardStoreOwner, CardStoreBreadperson } from "../../blocks/card-order-page";

export default function Stores() {
    const [stores, setStores] = useState<Store[] | null>(null)
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

    useEffect( () => {
        const getStores = async () => {
            try {
                const storesData = await fetchStores();
                setStores(storesData)
            } catch (error) {
                console.error("Error fetching stores:", error);
                throw error;
            }
        }
        getStores().catch(console.error)
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            await addStore(newStore)
            console.log("added new store:", newStore)
            setStores((prevStores) => [...(prevStores || []), newStore]);
        } catch (error) {
            console.log("Failed to add store", error)
        }
    }

    // const handleDeleteStore = async (ButikId: number) => { //TODO: implement properly at a later point
    //     try {
    //         await deleteStore(ButikId)
    //         console.log(`Store with ID ${ButikId} deleted successfully`);
    //     } catch (error) {
    //         console.log("Error deleting store", error)
    //     }
    // }; 

    const handleStore = (store: Store) => {
        console.log("Store selected:", store.ButikId)
    };

    return (
        <main>
            <Menu />
            <div className="space-y-8">
            {stores ? (
                stores.map((store) => (
                    <CardStore onClick={() => {handleStore(store)}} key={store.ButikId} className="">
                            <CardStoreContent>
                                <CardStoreInformation>
                                    <p className="font-semibold font-inter text-[1rem] leading-[1.1875rem]">{store.ButikNamn} 
                                        <span className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]"> {store.ButikNummer}</span>
                                    </p>
                                    <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store.Besöksadress}</p>
                                </CardStoreInformation>
                                <CardStoreContacts>
                                    <CardStoreOwner>
                                        <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Butikägare: </p>
                                        <article className="w-full flex items-center justify-start gap-1.5">
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store.ButikschefNamn}</p>
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store.ButikschefTelefon}</p>
                                        </article>
                                    </CardStoreOwner>
                                    <CardStoreBreadperson>
                                        <p className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">Brödansvarig: </p>
                                        <article className="w-full flex items-center justify-start gap-1.5">
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store.BrödansvarigNamn}</p>
                                            <p className="font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{store.BrödansvarigTelefon}</p>
                                        </article>
                                    </CardStoreBreadperson>
                                </CardStoreContacts>
                            </CardStoreContent>                                                             
                        </CardStore>
                ))
            ) : (
                <div>no stores to load</div>
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
                </form>
            </div>
        </main>
    )
}