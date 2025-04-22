import { PropsWithChildren, useState, useEffect } from "react";
import OrderContext from "./OrderContext";
import { fetchOrders } from "../../lib/api";
import { Order } from "../../types/types";

type OrderProviderProps = PropsWithChildren

export default function OrderProvider({children}: OrderProviderProps) {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getOrders = async () => {
            setLoading(true)
            try {
                const ordersData = await fetchOrders();
                console.log(ordersData.Data)
                setOrders(ordersData.Data)
            } catch (error) {
                console.error("Error fetching orders:", error);
                throw error;
            } finally {
                setLoading(false)
            }
        }
        getOrders().catch(console.error)
    }, []);

    const getOrder = (BeställningId: number) => {
        return orders.find((order) => order.BeställningId === BeställningId) || null
    }

    return (
        <OrderContext.Provider value={{ orders, setOrders, loading, getOrder}}>
            {children}
        </OrderContext.Provider>
    )
};