import { useOrders } from "../components/order-provider/OrderContext";

export const useFilteredOrders = () => {
  const { orders } = useOrders();

  const now = new Date();

  const maxOrders = 5;

  const upcoming = orders?.filter(order => {
    const deliveryDate = new Date(order.PreliminärtLeveransdatum);
    return deliveryDate >= now;
  })
  .slice(0, maxOrders) ?? [];

  const previous = orders?.filter(order => {
    const deliveryDate = new Date(order.PreliminärtLeveransdatum);
    return deliveryDate < now;
  })
  .slice(0, maxOrders) ?? [];

  return { upcoming, previous };
};
