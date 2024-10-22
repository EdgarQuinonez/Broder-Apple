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
  buyoutPrice: number;
  shippingCosts: number;
  estimatedSalePrice?: number;
}

export interface InventoryProduct {
  productID: number;
  product: Product;
  purchaseDate: Date;
  isListedForSale: boolean;
}

export interface Sale {
  saleID: number;
  product: Product;
  saleDate: Date;
  salePrice: number;
  buyer?: string;
  profit: number;
  paymentMethod: 'bank' | 'cash';
}
