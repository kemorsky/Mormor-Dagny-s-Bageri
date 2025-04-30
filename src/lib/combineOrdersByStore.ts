type CombinedStoreOrders = {
    ButikId: number;
    ButikNamn: string;
    CurrentOrders: number;
    PreviousOrders: number;
  };
  
  export const combineOrdersByStore = (
    upcoming: { ButikId: number; Butik?: { ButikNamn?: string } }[],
    previous: { ButikId: number; Butik?: { ButikNamn?: string } }[]
  ): CombinedStoreOrders[] => {
    const map = new Map<number, CombinedStoreOrders>();
  
    for (const order of upcoming) {
      const butikId = order.ButikId;
      const butikNamn = order.Butik?.ButikNamn ?? "Okänd butik";
  
      map.set(butikId, {
        ButikId: butikId,
        ButikNamn: butikNamn,
        CurrentOrders: 1,
        PreviousOrders: 0
      });
    }
  
    for (const order of previous) {
      const butikId = order.ButikId;
      const butikNamn = order.Butik?.ButikNamn ?? "Okänd butik";
  
      const existing = map.get(butikId);
      if (existing) {
        existing.PreviousOrders += 1;
      } else {
        map.set(butikId, {
          ButikId: butikId,
          ButikNamn: butikNamn,
          CurrentOrders: 0,
          PreviousOrders: 1
        });
      }
    }
  
    // Merge duplicates from upcoming
    for (const order of upcoming) {
      const butikId = order.ButikId;
      const existing = map.get(butikId);
      if (existing) {
        existing.CurrentOrders += 1;
      }
    }
  
    return Array.from(map.values());
  };
  