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
import { Observable, of } from 'rxjs';
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

  // TODO: Fetch actors from API
  actorList = [
    {
      id: 1,
      name: 'Investor 1',
      // TODO: Perform calculations to determine the percentage based on the quantity.
      quantity: 50,
      percentage: 50,
    },
    {
      id: 2,
      name: 'Investor 2',
      quantity: 50,
      percentage: 50,
    },
  ];

  // ------------------ Doughnut Chart Configuration ------------------

  public doughnutChartLabels: string[] = ['Investor 1', 'Investor 2'];
  // TODO: Have a switch case to determine the colors based on the number of actors.
  // TODO: Fix colors and change stroke width to be thinner. Fix dimensions and make it responsive.
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [
      {
        // TODO: Data comes from actors quantity array.
        data: [50, 50],
        backgroundColor: ['#42A5F5', '#66BB6A'],
        hoverBackgroundColor: ['#64B5F6', '#81C784'],
      },
    ];

  // TODO: Remove labels. Only the doughnut chart should be displayed.
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };

  // -------------------------------------------------------------------

  paymentMethod = 'cash';
  isCash = this.paymentMethod === 'cash';
  isBank = this.paymentMethod === 'bank';

  transactionForm = new FormGroup({
    paymentMethod: new FormControl('cash'),
    actors: new FormArray(
      this.actorList.map(
        () =>
          new FormGroup({
            quantity: new FormControl(0),
            percentage: new FormControl(0),
          })
      )
    ),
  });

  constructor(private route: ActivatedRoute, private _location: Location) {}

  get actors(): FormArray {
    return this.transactionForm.get('actors') as FormArray;
  }

  // Remove actor by index
  removeActor(index: number): void {
    this.actors.removeAt(index);
  }

  // Safely get the quantity FormControl for each actor
  getQuantityControl(actor: AbstractControl): FormControl {
    return actor.get('quantity') as FormControl;
  }

  // Safely get the percentage FormControl for each actor
  getPercentageControl(actor: AbstractControl): FormControl {
    return actor.get('percentage') as FormControl;
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
