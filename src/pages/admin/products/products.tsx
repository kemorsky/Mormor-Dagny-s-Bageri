import { useState } from "react"
import { addProduct, deleteProduct, editProduct } from "../../../lib/api"
import { Product } from "../../../types/types"
import { useProducts } from "../../../components/auth/ProductContext"
import { defaultProduct } from "../../../constants/prefab-consts"
import Menu from "../../../elements/menu/menu"
import { InputPrimary } from "../../../components/ui/input"
import { ButtonAdminManage, ButtonAdminDelete, ButtonOrder } from "../../../components/ui/button"
import { ProductCard, ProductCardName, ProductCardPrice } from "../../../blocks/card"

export default function Products() {
    const { products, setProducts } = useProducts()
    
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [newProduct, setNewProduct] = useState<Product>(() => ({ ...defaultProduct }))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (newProduct) {
                const response = await addProduct(newProduct)
                console.log(newProduct)
                setProducts((prev) => {
                    const updated = [...prev, {...newProduct, ProduktId: response.ProduktId}]
                    return updated;
                })
                setNewProduct(newProduct);
                setNewProduct({ ...defaultProduct });
            } else {
                console.error("newProduct is null, cannot add product")
            }
        } catch (error) {
            console.log("Could not add new product", error)
        }
    };

    const handleDelete = async (ProduktId: number) => {
        const confirmDelete = window.confirm("Är du säker på att du vill ta bort den här produkten?");
        if (!confirmDelete) {
            return;
    }
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
        <main className="w-full min-h-screen inline-flex flex-col items-center justify-start bg-Branding-backgroundPrimary px-4">
            <div className="max-w-[60rem] w-full inline-flex flex-col items-center justify-start gap-6 py-4">
                <Menu />
                <div className="flex flex-col items-center justify-center gap-3">
                    <form className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-Branding-cardPrimary shadow-[0px_0px_6px_2px_rgba(100,100,100,0.15)]" action="" onSubmit={handleSubmit}>
                        <label className="w-full flex flex-col items-start justify-center gap-2">
                            <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Namn</span>
                            <InputPrimary type="text"
                                placeholder="Namn"
                                value={newProduct?.Namn}
                                onChange={(e) => {setNewProduct({...newProduct, Namn: e.target.value})}} />
                        </label>
                        <label className="w-full flex flex-col items-start justify-center gap-2">
                            <span className="text-[0.875rem] leading-[0.875rem] font-inter font-semibold text-Branding-textPrimary">Baspris</span>
                            <InputPrimary
                                type="text"
                                placeholder="Baspris"
                                value={newProduct?.Baspris !== undefined && !isNaN(newProduct.Baspris) ? newProduct.Baspris : ''}
                                step="any"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setNewProduct({ ...newProduct, Baspris: value === '' ? 0 : parseFloat(value) });}}/>
                        </label>
                        <ButtonOrder type="submit">Lägg till produkt</ButtonOrder>
                    </form>
                </div>
                <section className="w-full max-w-[33.792rem] bg-Branding-cardPrimary shadow-[0px_0px_6px_2px_rgba(100,100,100,0.15)] inline-flex flex-col items-start justify-center p-3 rounded-xl gap-3">
                    {products ? (
                        products.map((product, index) => (
                            editingProduct?.ProduktId === product.ProduktId ? (
                            <form key={index} className=" w-full" onSubmit={handleSaveEdit}>
                                <ProductCard className="items-center">
                                    <input
                                        type="text"
                                        placeholder="Edit Namn"
                                        value={editingProduct?.Namn}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, Namn: e.target.value })}
                                        className="max-w-[10rem] sm:max-w-[12rem] p-2 rounded-lg border border-white/65 font-semibold font-inter text-[0.875rem] leading-[1rem] sm:text-[1rem] sm:leading-[1.1875rem] bg-Branding-input"/>
                                    <input
                                        type="text"
                                        placeholder="Edit Baspris"
                                        value={editingProduct?.Baspris}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, Baspris: parseFloat(e.target.value) })}
                                        className="p-2 max-w-[2.75rem] sm:max-w-[3.5rem] rounded-lg border border-white/65 font-semibold font-inter text-[0.875rem] leading-[1rem] sm:text-[1rem] sm:leading-[1.1875rem] bg-Branding-input"/>
                                    <div className="flex gap-2">
                                        <ButtonAdminManage type="submit" className="min-w-[5.625rem]">Spara</ButtonAdminManage>
                                        <ButtonAdminDelete
                                            type="button"
                                            onClick={() => setEditingProduct(null)}>
                                                Avbryt
                                        </ButtonAdminDelete>
                                    </div>
                                </ProductCard>
                            </form>
                            ) : (
                            <ProductCard key={index} className="items-center">
                                <ProductCardName>{product.Namn}</ProductCardName>
                                <ProductCardPrice>{product.Baspris} kr</ProductCardPrice>
                                <div className="inline-flex items-center justify-center gap-2">
                                    <ButtonAdminManage onClick={() => product.ProduktId !== undefined && handleEdit(product)}>Redigera</ButtonAdminManage>
                                    <ButtonAdminDelete onClick={() => product.ProduktId !== undefined && handleDelete(product.ProduktId)}>Ta bort</ButtonAdminDelete>
                                </div>
                            </ProductCard>
                            )
                        ))
                    ) : (
                    <p>Error loading products</p>
                    )}
                </section>
            </div>
        </main>
    )
};