import { useContext, createContext } from "react";
import { Store } from "../../types/types";

type StoreContext = {
    stores: Store[],
    setStores: React.Dispatch<React.SetStateAction<Store[]>>;
    loading: boolean,
    getStore: (butikId: number) => Store | null,
    searchStores: (query: string) => Store[],
    allStoresRef: React.RefObject<Store[]>, // ← add this
}

const StoreContext = createContext<StoreContext | null>(null);

export const useStores = () => {
    const context = useContext(StoreContext)
    if (context === null || undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return { stores: context.stores ?? [], setStores: context.setStores, loading: context.loading, getStore: context.getStore, searchStores: context.searchStores, allStoresRef: context.allStoresRef };
}

export default StoreContext