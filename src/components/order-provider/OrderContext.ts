import { useContext, createContext } from "react";
import { Order } from "../../types/types";

type OrderContext = {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    loading: boolean;
    getOrder: (BeställningId: number) => Order | null;
}

const OrderContext = createContext<OrderContext | null>(null);

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (context === null || undefined) {
        throw new Error("OrderContext failed");
    }

    return {orders: context.orders ?? [], setOrders: context.setOrders, getProduct: context.getOrder}
}

export default OrderContext