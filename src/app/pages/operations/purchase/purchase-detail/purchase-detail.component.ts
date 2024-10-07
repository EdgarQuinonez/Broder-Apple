import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  ArrowLeftIcon,
  BanknoteIcon,
  CreditCardIcon,
  LucideAngularModule,
  PlusIcon,
} from 'lucide-angular';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common'; // Import Location service
import { InputRadioComponent } from '@shared/input-radio/input-radio.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Chart, ChartType, ChartOptions, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-purchase-detail',
  standalone: true,
  imports: [
    NgIf,
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
    InputRadioComponent,
    ReactiveFormsModule,
    BaseChartDirective,
  ],
  templateUrl: './purchase-detail.component.html',
  styleUrl: './purchase-detail.component.scss',
})
export class PurchaseDetailComponent {
  ArrowLeftIcon = ArrowLeftIcon;
  BanknoteIcon = BanknoteIcon;
  CreditCardIcon = CreditCardIcon;
  PlusIcon = PlusIcon;

  selectedProduct: any;
  totalCost: number = 0;

  // TODO: Fetch actors from the API. Actors already added in the business.
  public pieChartLabels: string[][] = [['Investor 1'], ['Investor 2']];
  public pieChartData: ChartData<'pie', number[], string[]> = {
    labels: [['Investor 1'], ['Investor 2']],
    datasets: [
      {
        data: [50, 50],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  paymentMethod = 'cash';
  isCash = this.paymentMethod === 'cash';
  isBank = this.paymentMethod === 'bank';

  transactionForm = new FormGroup({
    type: new FormControl('income'),
    amount: new FormControl(0),
    description: new FormControl(''),
    paymentMethod: new FormControl('cash'),
  });

  // TODO: Mocked product data (replace this with service calls if you have an API)
  // TODO: Add product types
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

  constructor(private route: ActivatedRoute, private _location: Location) {}

  ngOnInit() {
    // Fetch the product ID from the route
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    // Find the selected product from the mocked data
    this.selectedProduct = this.allProducts.find(
      (product) => product.id === productId
    );

    this.totalCost =
      this.selectedProduct.price + this.selectedProduct.shippingCosts;
  }

  // Method to go back to the previous page
  goBack() {
    this._location.back();
  }

  // TODO: Perform double entry accounting movements for the purchase and add the purchased item to inventory.
  handleSubmit() {
    console.log('Form submitted');
  }
}
