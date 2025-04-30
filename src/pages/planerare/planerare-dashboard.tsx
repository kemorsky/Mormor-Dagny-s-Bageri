import { useState, useEffect } from "react"
import { fetchDashboardStatistics } from "../../lib/api";
import { DashboardStats } from "../../types/types";
import Menu from "../../elements/menu/menu";
import { Main, Wrapper } from "../../blocks/wrappers";
import { PlanerareCard, PlanerareCardName, PlanerareCardAmount } from "../../blocks/planerare-cards";
import { useFilteredOrders } from "../../hooks/useFilteredOrders";
import { useOrderedProducts } from "../../hooks/useOrderedProducts";
import { combineOrderedProducts } from "../../lib/combineProducts"; //
import { combineOrdersByStore } from "../../lib/combineOrdersByStore";

export default function PlanerareDashboard() {
    const [ stats, setStats ] = useState<DashboardStats>();
    const { upcoming, previous } = useFilteredOrders();

    const safeUpcoming = upcoming
    .filter(order => typeof order.ButikId === "number")
    .map(order => ({
      ButikId: order.ButikId as number,
      Butik: order.Butik,
    }));
  
  const safePrevious = previous
    .filter(order => typeof order.ButikId === "number")
    .map(order => ({
      ButikId: order.ButikId as number,
      Butik: order.Butik,
    }));
  
    const combinedStoreOrders = combineOrdersByStore(safeUpcoming, safePrevious);

    const upcomingTopProducts = useOrderedProducts(upcoming);
    const previousTopProducts = useOrderedProducts(previous);
    const combinedProducts = combineOrderedProducts(upcomingTopProducts, previousTopProducts);

    

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
                    <div className="w-full flex flex-col gap-3">
                        <h2 className="text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Alla statistiker</h2>
                        <section className="inline-flex flex-row gap-3">
                            <section className="min-w-[9rem] h-[6rem] p-3 rounded-xl border-black bg-gray-500 inline-flex flex-col items-start justify-center gap-3">
                                <p className="text-[2rem] leading-[2rem] font-bold">{stats.TotalOrders}</p>
                                <h1 className="text-[1rem] leading-[1.125rem]" >Beställningar</h1>
                            </section>
                            <section className="min-w-[9rem] h-[6rem] p-3 rounded-xl border-black bg-gray-500 inline-flex flex-col items-start justify-center gap-3">
                                <p className="text-[2rem] leading-[2rem] font-bold">{stats.TotalRevenue.toFixed(2)} kr</p>
                                <h1 className="text-[1rem] leading-[1.125rem] font-medium" >Inkomst</h1>
                            </section>
                        </section>
                    </div>
                    <section className="max-w-[35rem] w-full flex items-start flex-col gap-3">
                        <h2 className="text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Beställningar per butik</h2>
                        <div className="w-full bg-Branding-cardPrimary rounded-lg border border-black">
                            <div className="flex flex-col gap-3 w-full">
                                <article className="w-full grid grid-cols-[2.25fr_1fr_1fr] border-b font-semibold px-3 py-3">
                                    <span>Butik Namn</span>
                                    <span>Pågående</span>
                                    <span>Tidigare</span>
                                </article>
                                {combinedStoreOrders.map((store, index) => (
                                    <PlanerareCard key={index} className="grid grid-cols-[2.25fr_1fr_1fr] items-center">
                                        <PlanerareCardName>{store.ButikNamn}</PlanerareCardName>
                                        <PlanerareCardAmount>{store.CurrentOrders}</PlanerareCardAmount>
                                        <PlanerareCardAmount>{store.PreviousOrders}</PlanerareCardAmount>
                                    </PlanerareCard>
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                    <h2 className="text-[1.125rem] leading-[1.375rem] font-open-sans font-semibold">Beställda produkter</h2>
                    <div className="w-full inline-flex flex-col bg-blue-500 rounded-lg border border-black">
                        <div className="flex flex-col gap-3 w-full">
                            <article className="w-full grid grid-cols-[2.25fr_1fr_1fr] border-b font-semibold px-3 py-3">
                                <span>Produkt Namn</span>
                                <span>Kommande</span>
                                <span>Tidigare</span>
                            </article>
                            {combinedProducts.map((product, index) => (
                                <PlanerareCard key={index} className="grid grid-cols-[2.25fr_1fr_1fr] items-center">
                                    <PlanerareCardName>{product.ProduktNamn}</PlanerareCardName>
                                    <PlanerareCardAmount>{product.CurrentAntal}</PlanerareCardAmount>
                                    <PlanerareCardAmount>{product.PreviousAntal}</PlanerareCardAmount>
                                </PlanerareCard>
                            ))}
                        </div>
                    </div>
                </div>
            </Wrapper>
        </Main>
    )
}