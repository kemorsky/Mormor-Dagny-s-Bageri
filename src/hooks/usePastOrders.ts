import { useState, useEffect } from "react";
import { Order } from "../types/types";

export function usePastOrders() {
    const [pastOrders, setPastOrders] = useState<Order[]>([]);

    const getPastOrders = async () => {
        
    }
}