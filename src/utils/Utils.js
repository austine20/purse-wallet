export const _formatCurrency = (value) => {
  let currency = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  return currency.format(value);
};
