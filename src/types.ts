// TODO: Actor related to a Purchase will have quantity and percentage.
// Actor related to a Sale will have profit.

export interface Actor {
  id: number;
  name: string;
}

export interface InventoryActor {
  actorID: number;
  actor: Actor;
  quantity: number;
  percentage: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
  model: string;
  storageCapacity: string;
  carrier: string;
  simSlots: number;
  seller: string;

  shippingCosts: number;
  estimatedSalePrice?: number;
}

export interface InventoryProduct {
  productID: number;
  product: Product;
  purchaseDate: Date;
  isListedForSale: boolean;
  actors: InventoryActor[];
}

export interface Sale {
  saleID: number;
  product: Product;
  saleDate: Date;
  salePrice: number;
  buyer?: string;
  profit: number;
  actors: Actor[];
  paymentMethod: 'bank' | 'cash';
}
