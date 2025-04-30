import { useState, useEffect } from "react"
import { fetchDashboardStatistics } from "../../lib/api";
import { DashboardStats } from "../../types/types";
import { ProductCard, ProductCardName, ProductCardAmount, ProductCardTotalPrice } from "../../blocks/card";
import Menu from "../../elements/menu/menu";
import { Main, Wrapper } from "../../blocks/wrappers";
import { PlanerareCard, PlanerareCardName, PlanerareCardAmount } from "../../blocks/planerare-cards";

export default function PlanerareDashboard() {
    const [stats, setStats] = useState<DashboardStats>()

    useEffect(() => {
        const getStats = async () => {
            try {
                const stats = await fetchDashboardStatistics()
                console.log(stats)
                setStats(stats)   
            } catch (error) {
                console.error("Error fetching statistics:", error);
            }
        }
        getStats()
    }, [])

    if (!stats) { return <div>Loading...</div>}

    return (
        <Main>
            <Wrapper>
                <Menu />
                <div className="w-full max-w-[33.75rem] inline-flex flex-col sm:items-start items-center gap-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <section className="min-w-[9rem] h-[6rem] p-3 rounded-xl border-black bg-gray-500 inline-flex flex-col items-start justify-center gap-3">
                            <p className="text-[2rem] leading-[2rem] font-bold">{stats.TotalOrders}</p>
                            <h1 className="text-[1rem] leading-[1.125rem]" >Beställningar</h1>
                        </section>
                        <section className="min-w-[9rem] h-[6rem] p-3 rounded-xl border-black bg-gray-500 inline-flex flex-col items-start justify-center gap-3">
                            <p className="text-[2rem] leading-[2rem] font-bold">{stats.TotalRevenue.toFixed(2)} kr</p>
                            <h1 className="text-[1rem] leading-[1.125rem] font-medium" >Inkomst</h1>
                        </section>
                    </div>
                    <section className="max-w-[35rem] w-full flex items-start flex-col gap-3">
                        <h2 className="text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Beställningar per butik</h2>
                        <div className=" bg-Branding-cardPrimary rounded-lg border border-black">
                            {stats.OrdersByStore.map((store, index) => (
                                <PlanerareCard key={index}>
                                    <PlanerareCardName>{store.ButikNamn}</PlanerareCardName>
                                    <PlanerareCardAmount>Beställningar: {store.TotalOrders}</PlanerareCardAmount>
                                </PlanerareCard>
                                ))
                            }
                        </div>
                    </section>
                </div>
                
                
                <div className="inline-flex flex-col gap-10">
                    <section>
                        {stats?.MostOrderedProducts.map((product, index) => (
                            <ProductCard key={index}>
                                <ProductCardName>{product.ProduktNamn}</ProductCardName>
                                <ProductCardAmount>Beställda: {product.TotalAntal}</ProductCardAmount>
                            </ProductCard>
                            ))
                        }
                    </section>
                    
                </div>
            </Wrapper>
        </Main>
    )
}