import { PropsWithChildren, useState, useEffect } from "react";
import ProductContext from "./ProductContext";
import { fetchProducts } from "../../lib/api";
import { Product } from "../../types/types";

type ProductsProviderProps = PropsWithChildren

export default function ProductsProvider({children}: ProductsProviderProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
                const productsData = await fetchProducts();
                setProducts(productsData);
            } catch (error) {
                console.error("Fetch Error:", error);
                throw error;
            } finally {
                setLoading(false)
            }
        }
        getProducts().catch((error) => {
            console.error("Uncaught error:", error);
          });
    }, []);

    const getProduct = (ProduktId: number) => {
        return products.find((product) => product.ProduktId === ProduktId) || null
    }

    return (
        <ProductContext.Provider value={{products, setProducts, loading, getProduct}}>
            {children}
        </ProductContext.Provider>
    )
}
