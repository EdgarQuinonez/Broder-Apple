import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-purchase-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './purchase-detail.component.html',
  styleUrl: './purchase-detail.component.scss',
})
export class PurchaseDetailComponent {
  selectedProduct: any;

  // TODO: Mocked product data (replace this with service calls if you have an API)
  allProducts = [
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Fetch the product ID from the route
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    // Find the selected product from the mocked data
    this.selectedProduct = this.allProducts.find(
      (product) => product.id === productId
    );
  }
}
