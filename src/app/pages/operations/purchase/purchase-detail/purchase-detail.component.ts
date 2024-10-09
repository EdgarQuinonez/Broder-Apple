import { NgFor, NgIf } from '@angular/common';
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
  ChevronRightIcon,
  CreditCardIcon,
  LucideAngularModule,
  PlusIcon,
} from 'lucide-angular';
import { Observable, of, Subscription } from 'rxjs';
import { Location } from '@angular/common'; // Import Location service
import { InputRadioComponent } from '@shared/input-radio/input-radio.component';
import {
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import {
  Chart,
  ChartType,
  ChartOptions,
  ChartData,
  ChartConfiguration,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ActorListComponent } from './actor-list/actor-list.component';

@Component({
  selector: 'app-purchase-detail',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
    InputRadioComponent,
    ReactiveFormsModule,
    BaseChartDirective,
    ActorListComponent,
  ],
  templateUrl: './purchase-detail.component.html',
  styleUrl: './purchase-detail.component.scss',
})
export class PurchaseDetailComponent {
  ArrowLeftIcon = ArrowLeftIcon;
  BanknoteIcon = BanknoteIcon;
  CreditCardIcon = CreditCardIcon;
  ChevronRightIcon = ChevronRightIcon;
  PlusIcon = PlusIcon;

  selectedProduct: any;
  totalCost: number = 0;

  // ------------------ Doughnut Chart Configuration ------------------

  public doughnutChartLabels: string[] = ['Investor 1', 'Investor 2'];
  // TODO: Have a switch case to determine the colors based on the number of actors.
  // TODO: Fix colors and change stroke width to be thinner. Fix dimensions and make it responsive.
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [
      {
        // TODO: Data comes from actors quantity array.
        data: [],
        backgroundColor: ['#42A5F5', '#66BB6A'],
        hoverBackgroundColor: ['#64B5F6', '#81C784'],
      },
    ];

  // TODO: Remove labels. Only the doughnut chart should be displayed.
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: $${value}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  // -------------------------------------------------------------------

  paymentMethod = 'cash';
  isCash = this.paymentMethod === 'cash';
  isBank = this.paymentMethod === 'bank';

  constructor(private route: ActivatedRoute, private _location: Location) {
    // Fetch product and initialize total cost
  }

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.selectedProduct = this.allProducts.find(
      (product) => product.id === productId
    );

    this.totalCost =
      this.selectedProduct.price + this.selectedProduct.shippingCosts;

    this.updateChart();
  }

  // Event handler to update the chart when actorList changes
  updateChart(actorList: any[]) {
    this.doughnutChartLabels = actorList.map((actor) => actor.name);
    this.doughnutChartDatasets[0].data = actorList.map(
      (actor) => actor.quantity
    );
  }

  // TODO: Mocked product data (replace this with service calls if you have an API)
  // TODO: Add product types interface
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

  goBack() {
    this._location.back();
  }

  // TODO: Perform double entry accounting movements for the purchase and add the purchased item to inventory.
  handleSubmit() {
    const bodyData = {
      product: this.selectedProduct,
      actors: this.transactionForm.value.actors,
      paymentMethod: this.transactionForm.value.paymentMethod,
      totalCost: this.totalCost,
    };

    console.log(bodyData);

    // TODO: Once transaction is successful, it should create a row for Inventory for new product.
    // TODO: Debit the Inventory account and credit the Cash/Bank account for each actor.
  }
}
