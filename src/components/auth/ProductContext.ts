import { useContext, createContext } from "react";
import { Product } from "../../types/types";

type ProductContext = {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    loading: boolean;
    getProduct: (produktId: number) => Product | null;
}

const ProductContext = createContext<ProductContext | null>(null);

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === null || undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return {products: context.products ?? [], setProducts: context.setProducts}
}

export default ProductContext