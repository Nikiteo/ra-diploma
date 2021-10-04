import fetchData from "./fetch";

export const createOrder = async (phone, address, cartData) => {
  const urlOrder = `${process.env.REACT_APP_ORDER_URL}`;
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      owner: {
        phone,
        address,
      },
      items: cartData.map((item) => ({
        id: item.id,
        price: item.prices,
        count: item.quanities,
      })),
    }),
  };
  return fetchData(urlOrder, opts);
};