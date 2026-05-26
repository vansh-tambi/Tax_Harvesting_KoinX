export const formatCurrency = (val: number): string => {
  const isNegative = val < 0;
  const absValue = Math.abs(val);
  const formatted = absValue.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return isNegative ? `-₹${formatted}` : `₹${formatted}`;
};
