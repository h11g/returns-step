import { IOrder, IReturn, IReturnResolution } from "@/types";

const sleep = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), timeout);
  });
};

const getRamdomNumber = (max = 10, min = 1) => {
  return Math.round(Math.random() * (max - min)) + min;
};

export const getOrder = async ({ orderNumber, email }: any): Promise<IOrder> => {
  if(!orderNumber || !email) throw new Error('Invalid order number or email');

  await sleep(getRamdomNumber(300, 1000));
  return {
    id: getRamdomNumber(99999, 10000),
    orderNumber: 'Order123',
    items: [
      {
        id: getRamdomNumber(99999, 10000),
        name: 'Item 1',
      }
    ]
  }
}

export const getReturnList = async (empty = true): Promise<IReturn[]> => {
  await sleep(getRamdomNumber(300, 1000));
  const length = empty ? getRamdomNumber(0, 0) : getRamdomNumber(3, 3)
  return Array.from({ length }).map((_, index) => ({
    id: getRamdomNumber(99999, 10000),
    name: `RMA #${index}`,
  }));
};

export const getReturnResolution = async ({ itemId }: any): Promise<IReturnResolution[]> => {
  if(!itemId) throw new Error('Invalid item id');

  await sleep(getRamdomNumber(300, 1000));
  return Array.from({ length: getRamdomNumber(3) }).map((_, index) => ({
    id: getRamdomNumber(99999, 10000),
    name: `Return Resolution #${index}`,
  }));
};

export const getReturnShipping = async ({ itemId }: any) => {
  await sleep(getRamdomNumber(300, 1000));
  return Array.from({ length: getRamdomNumber(3) }).map((_, index) => ({
    id: getRamdomNumber(99999, 10000),
    name: `Return Shipping #${index}`,
  }));
};

