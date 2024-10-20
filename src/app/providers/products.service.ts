import { Injectable } from '@angular/core';
import { Product } from '@types';

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
      buyoutPrice: 5500,
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
      buyoutPrice: 5300,
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
      buyoutPrice: 5400,
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
      buyoutPrice: 5400,
      shippingCosts: 70,
    },
  ];

  getAllProducts(): Product[] {
    return this.allProducts;
  }

  getProductById(id: number): Product | null {
    return this.allProducts.find((product) => product.id === id) ?? null;
  }
}
