import { useState } from "react"
import { addProduct, deleteProduct, editProduct } from "../../../lib/api"
import { Product } from "../../../types/types"
import { CardProduct } from "../../../blocks/card-order-page"
import { useProducts } from "../../../components/auth/ProductContext"

export default function Products() {
    const { products, setProducts } = useProducts()
    
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [newProduct, setNewProduct] = useState<Product>({
        Namn: '',
        Baspris: undefined,
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await addProduct(newProduct)
            console.log(newProduct)
            setProducts((prev) => {
                const updated = [...prev, {...newProduct, ProduktId: response.ProduktId}]
                return updated;
            })
            setNewProduct(newProduct);
        } catch (error) {
            console.log("Could not add new product", error)
        }
    };

    const handleDelete = async (ProduktId: number) => {
        try {
            await deleteProduct(ProduktId)
            console.log("deleting items with ProduktId:", ProduktId)
            setProducts((prev) => prev?.filter(product => product.ProduktId !== ProduktId));        
        } catch (error) {
            console.log("failed to delete product", error)
        }
    };

    const handleEdit = (product: Product) => {
        console.log(product)
        setEditingProduct({...product})
    }

    const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingProduct) {
            const success = await editProduct(editingProduct)
            console.log(editingProduct)
            if (success) {
                setProducts((prevProducts) =>
                    prevProducts.map((prod) =>
                        prod.ProduktId === editingProduct.ProduktId
                            ? { ...prod, ...editingProduct }
                            : prod
                    )
                );
                setEditingProduct(null)
            }
        }
    };

    return (
        <main>
            <div>Products</div>
            {products ? (
                products.map((product, index) => (
                    <CardProduct key={index}>
                        <p className="w-[10rem] font-inter text-Branding-textPrimary text-[1rem] leading-[1.1875rem]">{product.Namn}</p>
                        <p className="w-[4rem] font-inter text-Branding-textSecondary text-[1rem] leading-[1.1875rem]">{product.Baspris} kr</p>
                        <button onClick={() => product.ProduktId !== undefined && handleEdit(product)}>Edit product</button>
                        <button onClick={() => product.ProduktId !== undefined && handleDelete(product.ProduktId)}>Delete product</button>

                        {editingProduct?.ProduktId === product.ProduktId && (
                            <form onSubmit={handleSaveEdit} className="flex flex-col gap-3 mt-3">
                                <input
                                    type="text"
                                    placeholder="Edit Namn"
                                    value={editingProduct?.Namn}
                                    onChange={(e) => {setEditingProduct({ ...editingProduct, Namn: e.target.value })}}
                                />
                                <input
                                    type="text"
                                    placeholder="Edit Baspris"
                                    value={editingProduct?.Baspris}
                                    onChange={(e) => {setEditingProduct({ ...editingProduct, Baspris: Number(e.target.value) })}}
                                />
                                <button type="submit">Save changes</button>
                                <button
                                    type="button"
                                    onClick={() => setEditingProduct(null)} // Cancel the editing mode
                                >
                                    Cancel
                                </button>
                            </form>
                        )}
                    </CardProduct>
                ))
            ) : (
                <p>Error loading products:</p>
            )} 
            <div className="flex flex-col items-center justify-center gap-3">Lägg till en produkt
                <form className="flex flex-col items-center justify-center gap-3" action="" onSubmit={handleSubmit}>
                    <input type="text"
                            placeholder="Namn"
                            value={newProduct.Namn}
                            onChange={(e) => {setNewProduct({...newProduct, Namn: e.target.value})}} />
                    <input type="text"
                            placeholder="Baspris"
                            value={newProduct.Baspris}
                            onChange={(e) => {setNewProduct({...newProduct, Baspris: Number(e.target.value)})}} />
                    <button type="submit">Lägg till produkt</button>
                </form>
            </div>
        </main>
    )
};