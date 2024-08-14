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

const buildUrl = (time: string, accType: string, limit?: number) => {
  let address = 'http://localhost:5000/api/lineItems/?';

  if (time) {
    address += `_time=${time}`;
  }

  if (accType) {
    address += `_acc=${accType}`;
  }

  if ((limit || 0) > 0) {
    address += `_limit=${limit}`;
  }

  return address;
};

export { formatAmount, formatDate, buildUrl };
