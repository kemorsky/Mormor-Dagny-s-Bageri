import { PropsWithChildren, useState, useEffect, useRef, useMemo } from "react";
import Fuse from "fuse.js";
import StoreContext from "./StoreContext";
import { fetchStores } from "../../lib/api";
import { Store } from "../../types/types";

type StoreProviderProps = PropsWithChildren

export default function StoreProvider({children}: StoreProviderProps) {
    const [stores, setStores] = useState<Store[]>([])
    const [loading, setLoading] = useState(false);

    const allStoresRef = useRef<Store[]>([]);

    const options = useMemo(() => ({
            keys: [
                'ButikNummer', 'ButikNamn', 'Besöksadress', 
                'BrödansvarigNamn', 'BrödansvarigTelefon', 
                'ButikschefNamn', 'ButikschefTelefon', 
                'Fakturaadress', 'Telefonnummer'
            ],
            threshold: 0.3,
            minMatchCharLength: 3
        }), []);

    useEffect( () => {
        const getStores = async () => {
            setLoading(true)
            try {
                const storesData = await fetchStores();
                setStores(storesData)
                allStoresRef.current = storesData;
            } catch (error) {
                console.error("Error fetching stores:", error);
                throw error;
            } finally {
                setLoading(false)
            }
        }
        getStores().catch(console.error)
    }, []);

    const searchStores = (query: string) => {
        if (allStoresRef.current) {
            const fuse = new Fuse(allStoresRef.current, options);
            const results = fuse.search(query).map(result => result.item);
            setStores(results);
            return results
        } else {
            return [];
        }
    }

    // const searchStores = (query: string) => {
    //     const fuse = new Fuse(stores, options);
    //     const results = fuse.search(query).map(result => result.item);
    //     setStores(results);
    //     return results
    // }

    const getStore = (butikId: number) => {
        return stores.find((store) => store.ButikId === butikId) || null
    }

    return (
        <StoreContext.Provider value={{ stores, setStores, loading, getStore, searchStores, allStoresRef }}>
            {children}
        </StoreContext.Provider>
    )
};