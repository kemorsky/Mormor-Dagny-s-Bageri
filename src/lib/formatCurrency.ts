export const formatCurrency = (value: number): string => {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)} Mkr`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(0)} tkr`;
    } else {
      return `${value.toFixed(0)} kr`;
    }
  }