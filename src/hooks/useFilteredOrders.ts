import { useOrders } from "../components/order-provider/OrderContext";
import { Order } from "../types/types";

export const useFilteredOrders = (page: number, pageSize: number) => {
  const { orders } = useOrders();
  const now = new Date();

  const getPagination = (filtered: Order[]) => {
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const paginatedData = filtered.slice((page -1) * pageSize, page * pageSize);

    return {
      TotalItems: totalItems,
      Page: page,
      PageSize: pageSize,
      TotalPages: totalPages,
      Data: paginatedData
    }
  }

  // const maxOrders = 5;
  // .slice(0, maxOrders) ?? 

  const upcoming = (orders ?? []).filter((order): order is Order => !!order).filter(order => {
    const deliveryDate = order.PreliminärtLeveransdatum
    const timestamp = deliveryDate ? Date.parse(deliveryDate) : NaN;
    return !isNaN(timestamp) && new Date(timestamp) >= now;
  }) ?? [];

  const previous = (orders ?? []).filter((order): order is Order => !!order).filter(order => {
    const deliveryDate = order.PreliminärtLeveransdatum;
    const timestamp = deliveryDate ? Date.parse(deliveryDate) : NaN;
    return !isNaN(timestamp) && new Date(timestamp) < now;
  }) ?? [];

  return { upcoming: getPagination(upcoming), previous: getPagination(previous) };
};
