type CombinedProduct = {
    ProduktId: number;
    ProduktNamn: string;
    CurrentAntal: number;
    PreviousAntal: number;
  };
  
  export const combineOrderedProducts = (
    upcoming: { ProduktId: number; ProduktNamn: string; TotalAntal: number }[],
    previous: { ProduktId: number; ProduktNamn: string; TotalAntal: number }[]
  ): CombinedProduct[] => {
    const map = new Map<number, CombinedProduct>();
  
    for (const prod of upcoming) {
      map.set(prod.ProduktId, {
        ProduktId: prod.ProduktId,
        ProduktNamn: prod.ProduktNamn,
        CurrentAntal: prod.TotalAntal,
        PreviousAntal: 0,
      });
    }
  
    for (const prod of previous) {
      const existing = map.get(prod.ProduktId);
      if (existing) {
        existing.PreviousAntal = prod.TotalAntal;
      } else {
        map.set(prod.ProduktId, {
          ProduktId: prod.ProduktId,
          ProduktNamn: prod.ProduktNamn,
          CurrentAntal: 0,
          PreviousAntal: prod.TotalAntal,
        });
      }
    }
  
    return Array.from(map.values());
  };
  