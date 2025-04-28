// StoreForm.tsx
import { Store } from '../../types/types';
import { useStores } from '../../components/auth/StoreContext';
import { addStore } from '../../lib/api';
import { AdminFormInput } from './admin-store-input';
import { ButtonAdminManage } from '../../components/ui/button';

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
    <form className="inline-flex flex-col items-center justify-center gap-4 pb-10" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
                <section className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
                        <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Butik Nummer</span>
                                <AdminFormInput type="text"
                                        placeholder="Butik Nummer"
                                        value={newStore.ButikNummer}
                                        onChange={(e) => setNewStore({ ...newStore, ButikNummer: e.target.value })}
                                        />
                        </label>
                        <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Butik Namn</span>
                                <AdminFormInput type="text"
                                        value={newStore.ButikNamn}
                                        placeholder="Butik Namn"
                                        onChange={(e) => setNewStore({ ...newStore, ButikNamn: e.target.value })} />
                        </label>
                </section>
                <section className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
                        <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Besöksadress</span>
                                <AdminFormInput type="text"
                                        value={newStore.Besöksadress}
                                        placeholder="Besökadress"
                                        onChange={(e) => setNewStore({ ...newStore, Besöksadress: e.target.value })} />
                        </label>
                        <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Butik Telefon</span>
                                <AdminFormInput type="text"
                                        value={newStore.Telefonnummer}
                                        placeholder="Telefonnummer"
                                        onChange={(e) => setNewStore({ ...newStore, Telefonnummer: e.target.value })} />
                        </label>
                </section>
        </div>
        <div className='flex flex-col gap-2'>
                <section className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
                        <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Brödansvarig Namn</span>
                                        <AdminFormInput type="text"
                                        value={newStore.BrödansvarigNamn}
                                        placeholder="Brödansvarig Namn"
                                        onChange={(e) => setNewStore({ ...newStore, BrödansvarigNamn: e.target.value })} />
                        </label>
                        <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Brödansvarig Telefon</span>
                                <AdminFormInput type="text"
                                        value={newStore.BrödansvarigTelefon}
                                        placeholder="Brödansvarig Telefon"
                                        onChange={(e) => setNewStore({ ...newStore, BrödansvarigTelefon: e.target.value })} />
                        </label>
                </section>
                <section className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
                        <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Butikschef Namn</span>
                                <AdminFormInput type="text"
                                        value={newStore.ButikschefNamn}
                                        placeholder="Butikchefs Namn"
                                        onChange={(e) => setNewStore({ ...newStore, ButikschefNamn: e.target.value })} />
                        </label>
                        <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Butikschef Telefon</span>
                                <AdminFormInput type="text"
                                        value={newStore.ButikschefTelefon}
                                        placeholder="Butikchefs Telefon"
                                        onChange={(e) => setNewStore({ ...newStore, ButikschefTelefon: e.target.value })} />
                        </label>
                </section>
        </div>
        <label className="w-full py-1 flex flex-col items-start justify-center gap-2">
                <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Fakturaadress</span>
                <AdminFormInput type="text"
                        value={newStore.Fakturaadress}
                        placeholder="Fakturaadress"
                        onChange={(e) => setNewStore({ ...newStore, Fakturaadress: e.target.value })} />
        </label>
        <label className="min-h-[50px] w-[4.5rem] flex items-center justify-between cursor-pointer self-start">
                <span className="font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">
                        {newStore.Låst ? "Låst" : "Olåst"}
                </span> 
                        <input
                        className="w-6 h-6 text-blue bg-gray-300 accent-blue-600 cursor-pointer"
                        type="checkbox"
                        checked={newStore.Låst ?? false}
                        onChange={(e) => setNewStore({ ...newStore, Låst: e.target.checked })}
                        />
        </label>             
        <ButtonAdminManage className='self-end' type="submit">Lägg till butiken</ButtonAdminManage>
        {isLoading ?? <p>Loading...</p>}
        </form>
  );
};

export default AddStoreForm;