import { Injectable } from '@angular/core';
import { InventoryProduct, Product } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  // Mocked product data
  private allProducts: Product[] = [
    {
      id: 1,
      title: 'iPhone 12',
      price: 5400,
      brand: 'Apple',
      model: 'iPhone 12',
      storageCapacity: '128GB',
      carrier: 'Unlocked',
      simSlots: 1,
      seller: 'Best Buy',
      shippingCosts: 100,
    },
    {
      id: 2,
      title: 'Samsung Galaxy S21',
      price: 5400,
      brand: 'Samsung',
      model: 'Galaxy S21',
      storageCapacity: '256GB',
      carrier: 'T-Mobile',
      simSlots: 1,
      seller: 'Amazon',

      shippingCosts: 80,
    },
    {
      id: 3,
      title: 'OnePlus 9',
      price: 5400,
      brand: 'OnePlus',
      model: '9',
      storageCapacity: '128GB',
      carrier: 'Unlocked',
      simSlots: 2,
      seller: 'OnePlus Store',

      shippingCosts: 50,
    },
    {
      id: 4,
      title: 'Google Pixel 5',
      price: 5400,
      brand: 'Google',
      model: 'Pixel 5',
      storageCapacity: '128GB',
      carrier: 'Verizon',
      simSlots: 1,
      seller: 'Google Store',

      shippingCosts: 70,
    },
  ];

  // Mocked Inventory data
  private inventory: InventoryProduct[] = [
    {
      productID: 1,
      product: this.allProducts[0],
      purchaseDate: new Date('2023-05-15'),
      actors: [
        {
          actorID: 1,
          actor: { id: 1, name: 'John Doe' },
          quantity: 2750,
          percentage: 0.5,
        },
        {
          actorID: 2,
          actor: { id: 2, name: 'Mortalika' },
          quantity: 2750,
          percentage: 0.5,
        },
      ],
      isListedForSale: false,
    },
  ];
  getAllProducts(): Product[] {
    return this.allProducts;
  }

  getInventory(): InventoryProduct[] {
    return this.inventory;
  }

  getProductById(id: number): Product | null {
    return this.allProducts.find((product) => product.id === id) ?? null;
  }

  getInventoryProductById(id: number): InventoryProduct | null {
    return this.inventory.find((product) => product.productID === id) ?? null;
  }
}
