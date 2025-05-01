import { useOrders } from "../components/order-provider/OrderContext";

export const useFilteredOrdersDashboard = () => { // This version of the hook filters through an unlimited number of orders
  const { orders } = useOrders();
  const now = new Date();

  const upcoming = orders?.filter(order => {
    const deliveryDate = order.PreliminärtLeveransdatum
    const timestamp = deliveryDate ? Date.parse(deliveryDate) : NaN;
    return !isNaN(timestamp) && new Date(timestamp) >= now;
  }) ?? [];

  const previous = orders?.filter(order => {
    const deliveryDate = order.PreliminärtLeveransdatum;
    const timestamp = deliveryDate ? Date.parse(deliveryDate) : NaN;
    return !isNaN(timestamp) && new Date(timestamp) < now;
  }) ?? [];

  return { upcoming, previous };
};