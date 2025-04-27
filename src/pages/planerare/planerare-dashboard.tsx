import { useState, useEffect } from "react"
import { fetchDashboardStatistics } from "../../lib/api";
import { DashboardStats } from "../../types/types";
import { ProductCard, ProductCardName, ProductCardAmount } from "../../blocks/card";
import Menu from "../../elements/menu/menu";

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
        <main className="w-full min-h-screen inline-flex flex-col items-center justify-start bg-Branding-backgroundPrimary px-4">
            <div className="max-w-[60rem] w-full inline-flex flex-col items-center justify-start gap-6 py-4">
                <Menu />
                <p>Total Orders: {stats.TotalOrders}</p>
                <p>Total Revenue: {stats.TotalRevenue.toFixed(2)} kr</p>
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
                    <section>
                        {stats.OrdersByStore.map((store, index) => (
                            <ProductCard key={index}>
                                <ProductCardName>{store.ButikNamn}</ProductCardName>
                                <ProductCardAmount>Beställningar: {store.TotalOrders}</ProductCardAmount>
                            </ProductCard>
                            ))
                        }
                    </section>
                </div>
            </div>
        </main>
    )
}