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

import { BaseChartDirective } from 'ng2-charts';
import { ActorListComponent } from './actor-list/actor-list.component';
import { ProductsService } from '@services/products.service';
import { Product } from '@types';

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

  paymentMethod = 'cash';
  isCash = this.paymentMethod === 'cash';
  isBank = this.paymentMethod === 'bank';

  allProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private productsService: ProductsService
  ) {
    this.allProducts = this.productsService.getAllProducts();
  }

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.selectedProduct = this.allProducts.find(
      (product) => product.id === productId
    );

    this.totalCost =
      this.selectedProduct.price + this.selectedProduct.shippingCosts;

    // this.updateChart();
  }

  // Event handler to update the chart when actorList changes
  // updateChart(actorList: any[]) {
  //   this.doughnutChartLabels = actorList.map((actor) => actor.name);
  //   this.doughnutChartDatasets[0].data = actorList.map(
  //     (actor) => actor.quantity
  //   );
  // }

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
