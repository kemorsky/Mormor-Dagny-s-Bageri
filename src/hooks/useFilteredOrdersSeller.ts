import { useOrders } from "../components/order-provider/OrderContext";

export const useFilteredOrdersSeller = () => { // This version of the hook filters through an limited number of orders to render in the UI
  const { orders } = useOrders();

  const now = new Date();

  const maxOrders = 8;

  const upcoming = orders?.filter(order => {
    const deliveryDate = order.PreliminärtLeveransdatum
    const timestamp = deliveryDate ? Date.parse(deliveryDate) : NaN;
    return !isNaN(timestamp) && new Date(timestamp) >= now;
  })
  .slice(0, maxOrders) ?? [];

  const previous = orders?.filter(order => {
    const deliveryDate = order.PreliminärtLeveransdatum;
    const timestamp = deliveryDate ? Date.parse(deliveryDate) : NaN;
    return !isNaN(timestamp) && new Date(timestamp) < now;
  })
  .slice(0, maxOrders) ?? [];

  return { upcoming, previous };
};