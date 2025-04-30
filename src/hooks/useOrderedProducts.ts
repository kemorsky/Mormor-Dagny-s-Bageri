import { Order } from "../types/types"; // Adjust path as needed

export const useOrderedProducts = (orders: Order[]): {
  ProduktId: number;
  ProduktNamn: string;
  TotalAntal: number;
}[] => {
  const productMap = new Map();

  for (const order of orders ?? []) {
    for (const detail of order.Beställningsdetaljer ?? []) {
      const key = detail.ProduktId;
      const existing = productMap.get(key) ?? {
        ProduktId: detail.ProduktId,
        ProduktNamn: detail.Produkt?.Namn ?? "Okänd produkt",
        TotalAntal: 0,
      };
      existing.TotalAntal += detail.Antal;
      productMap.set(key, existing);
    }
  }

  return Array.from(productMap.values()).sort((a, b) => b.TotalAntal - a.TotalAntal);
};
