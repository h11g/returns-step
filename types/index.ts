export interface IReturn {
  name: string;
  id: number
}

export interface IReturnResolution {
  name: string;
  id: number
}

export interface IVariantItem {
  name: string;
  id: number
}

export interface IOrder {
  orderNumber: string;
  id: number
  items: IVariantItem[]
}

export interface IReturnIntention {
  orderNumber: string;
  email: string;
  itemId: string;
  resolution: string;
  quantity: number;
  shipping: string;
}
