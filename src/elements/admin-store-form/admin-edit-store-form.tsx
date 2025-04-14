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
        <form onSubmit={handleSaveEdit}>
            <input type="text"
                    className=""
                    placeholder="Butik Nummer"
                    value={editingStore?.ButikNummer}
                    onChange={(e) => setEditingStore({ ...selected, ...editingStore, ButikNummer: e.target.value })}
            />
            <input type="text"
                    className=""
                    value={editingStore?.ButikNamn}
                    placeholder="Butik Namn"
                    onChange={(e) => setEditingStore({ ...selected, ...editingStore, ButikNamn: e.target.value})} />
            <input type="text"
                    className=""
                    value={editingStore?.Besöksadress}
                    placeholder="Besökadress"
                    onChange={(e) => setEditingStore({ ...selected, ...editingStore, Besöksadress: e.target.value })} />
            <input type="text"
                    className=""
                    value={editingStore?.BrödansvarigNamn}
                    placeholder="Brödansvarig Namn"
                    onChange={(e) => setEditingStore({ ...selected, ...editingStore, BrödansvarigNamn: e.target.value })} />
            <input type="text"
                    className=""
                    value={editingStore?.BrödansvarigTelefon}
                    placeholder="Brödansvarig Telefon"
                    onChange={(e) => setEditingStore({ ...selected, ...editingStore, BrödansvarigTelefon: e.target.value })} />
            <input type="text"
                    className=""
                    value={editingStore?.ButikschefNamn}
                    placeholder="Butikchefs Namn"
                    onChange={(e) => setEditingStore({ ...selected, ...editingStore, ButikschefNamn: e.target.value })} />
            <input type="text"
                    className=""
                    value={editingStore?.ButikschefTelefon}
                    placeholder="Butikchefs Telefon"
                    onChange={(e) => setEditingStore({ ...selected, ...editingStore, ButikschefTelefon: e.target.value })} />
            <input type="text"
                    className=""
                    value={editingStore?.Fakturaadress}
                    placeholder="Fakturaadress"
                    onChange={(e) => setEditingStore({ ...selected, ...editingStore, Fakturaadress: e.target.value })} />
            <input type="checkbox"
                    className="" />
            <input type="text"
                    className=""
                    value={editingStore?.Telefonnummer}
                    placeholder="Telefonnummer"
                    onChange={(e) => setEditingStore({ ...selected, ...editingStore, Telefonnummer: e.target.value })} />
            <button type="submit">Save changes</button>
            {isLoading ?? <p>Loading...</p>}
        </form>
    )
}

export default EditStoreForm