// StoreForm.tsx
import { Store } from '../../types/types';
import { useStores } from '../../components/auth/StoreContext';
import { addStore } from '../../lib/api';
import { AdminFormInput } from './admin-store-input';

type StoreFormProps = {
  newStore: Store;
  setNewStore: React.Dispatch<React.SetStateAction<Store>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const AddStoreForm: React.FC<StoreFormProps> = ({
  newStore,
  setNewStore,
  isLoading,
  setIsLoading,
}) => {

    const { setStores, allStoresRef } = useStores();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setIsLoading(true)
          try {
              const response = await addStore(newStore)
              setNewStore({...newStore, ButikId: response.ButikId})
              setStores((prev) => {
                  const updated = [...prev, {...newStore, ButikId: response.ButikId}];
                  allStoresRef.current = updated;
                  return updated;
              });
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

  return (
    <form className="inline-flex flex-col items-center justify-center gap-3" onSubmit={handleSubmit}>
                    <AdminFormInput type="text"
                            placeholder="Butik Nummer"
                            value={newStore.ButikNummer}
                            onChange={(e) => setNewStore({ ...newStore, ButikNummer: e.target.value })}
                             />
                    <AdminFormInput type="text"
                            value={newStore.ButikNamn}
                            placeholder="Butik Namn"
                            onChange={(e) => setNewStore({ ...newStore, ButikNamn: e.target.value })} />
                    <AdminFormInput type="text"
                            value={newStore.Besöksadress}
                            placeholder="Besökadress"
                            onChange={(e) => setNewStore({ ...newStore, Besöksadress: e.target.value })} />
                    <AdminFormInput type="text"
                            value={newStore.BrödansvarigNamn}
                            placeholder="Brödansvarig Namn"
                            onChange={(e) => setNewStore({ ...newStore, BrödansvarigNamn: e.target.value })} />
                    <AdminFormInput type="text"
                            value={newStore.BrödansvarigTelefon}
                            placeholder="Brödansvarig Telefon"
                            onChange={(e) => setNewStore({ ...newStore, BrödansvarigTelefon: e.target.value })} />
                    <AdminFormInput type="text"
                            value={newStore.ButikschefNamn}
                            placeholder="Butikchefs Namn"
                            onChange={(e) => setNewStore({ ...newStore, ButikschefNamn: e.target.value })} />
                    <AdminFormInput type="text"
                            value={newStore.ButikschefTelefon}
                            placeholder="Butikchefs Telefon"
                            onChange={(e) => setNewStore({ ...newStore, ButikschefTelefon: e.target.value })} />
                    <AdminFormInput type="text"
                            value={newStore.Fakturaadress}
                            placeholder="Fakturaadress"
                            onChange={(e) => setNewStore({ ...newStore, Fakturaadress: e.target.value })} />
                    <AdminFormInput type="checkbox" />
                    <AdminFormInput type="text"
                            value={newStore.Telefonnummer}
                            placeholder="Telefonnummer"
                            onChange={(e) => setNewStore({ ...newStore, Telefonnummer: e.target.value })} />
                    <button type="submit">Lägg till butiken</button>
                    {isLoading ?? <p>Loading...</p>}
                </form>
  );
};

export default AddStoreForm;