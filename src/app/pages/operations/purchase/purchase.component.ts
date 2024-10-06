import { Component } from '@angular/core';
import {
  LucideAngularModule,
  XIcon,
  SearchIcon,
  PlusIcon,
} from 'lucide-angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ButtonPrimaryComponent } from '@shared/button-primary/button-primary.component';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [
    LucideAngularModule,
    NgIf,
    NgFor,
    ButtonPrimaryComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss',
})
export class PurchaseComponent {
  XIcon = XIcon;
  SearchIcon = SearchIcon;
  PlusIcon = PlusIcon;

  searchTerm: string = '';
  fakeResults: { id: number; title: string; price: number }[] = [];
  selectedResultId: number | null = null;
  selectedResult: any = null;

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

  ngOnInit() {
    this.fakeResults = [...this.allProducts];
  }

  onSearchChange(event: any) {
    const searchValue = event.target.value.trim().toLowerCase();

    if (searchValue === '') {
      this.fakeResults = [...this.allProducts];
    } else {
      this.fakeResults = this.allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchValue)
      );
    }
  }

  handleInputChange(event: any, productId: number): void {
    this.selectedResultId = productId;
    this.selectedResult = this.allProducts.find(
      (product) => product.id === productId
    );
  }
}
