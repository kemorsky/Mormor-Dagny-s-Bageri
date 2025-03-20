import { useState } from "react"
import Menu from "../../elements/menu/menu"
import { InputPrimary } from "../../components/ui/input"
import { InputAmount } from "../../components/ui/input"
import { Card, CardHeader, ProductListCard, ProductCard, ProductCardName, ProductCardPrice, ProductCardAmount  } from "../../blocks/card"

export default function ConfirmationPage() {

    return (
        <main className="w-full min-h-[59.75rem] inline-flex flex-col items-center justify-center bg-red-900">
            <div className="w-full inline-flex flex-col items-start justify-center gap-6 px-3 py-3">
                <Menu />
                <section className="w-full inline-flex flex-col items-start justify-center gap-3">
                    <InputPrimary />
                    <p className="text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold text-Branding-textPrimary">Kund information</p>
                    <Card className="w-full">
                        <CardHeader>
                            test
                        </CardHeader>
                    </Card>
                </section>
                <section className="w-full inline-flex flex-col items-start justify-center gap-3">
                    <p className="text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold text-Branding-textPrimary">Tidigare Beställningar</p>
                    <div className="inline-flex items-center justify-around">
                        <Card className="">
                            <CardHeader>
                                test
                            </CardHeader>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                test
                            </CardHeader>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                test
                            </CardHeader>
                        </Card>
                    </div>
                </section>
                <section className="w-full inline-flex flex-col items-start justify-center gap-3">
                    <p className="text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold text-Branding-textPrimary">Produkter</p>
                    <ProductListCard>
                        <ProductCard>
                            <ProductCardName>Kardemummaskorpa</ProductCardName>
                            <ProductCardPrice>12.50 kr</ProductCardPrice>
                            <ProductCardAmount>Antal: <InputAmount /></ProductCardAmount>
                        </ProductCard>
                        <ProductCard>
                            <ProductCardName>Kardemummaskorpa</ProductCardName>
                            <ProductCardPrice>12.50 kr</ProductCardPrice>
                            <ProductCardAmount>Antal: <InputAmount /></ProductCardAmount>
                        </ProductCard>
                        <ProductCard>
                            <ProductCardName>Kardemummaskorpa</ProductCardName>
                            <ProductCardPrice>12.50 kr</ProductCardPrice>
                            <ProductCardAmount>Antal: <InputAmount /></ProductCardAmount>
                        </ProductCard>
                    </ProductListCard>
                </section>
            </div>
        </main>
    )
}