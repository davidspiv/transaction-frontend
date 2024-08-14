const formatAmount = (inputAmount: number) => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return USDollar.format(inputAmount / -100);
};

const formatDate = (inputDate: string) => {
  return new Date(inputDate).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const truncate = (desiredLength: number, input?: string) => {
  if (!input) return '';
  return input.length < desiredLength
    ? `"${input}"`
    : `"${input.slice(0, desiredLength)}...`;
};

export { formatAmount, formatDate, truncate };
