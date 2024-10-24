import { Component } from '@angular/core';
import { Location } from '@angular/common';

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { ProductsService } from '@services/products.service';
import { FormDataService } from '@services/form-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryProduct } from '@types';
import { fromEventPattern } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sale-details',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule],

  templateUrl: './sale-details.component.html',
  styleUrl: './sale-details.component.scss',
})
export class SaleDetailsComponent {
  ArrowLeftIcon = ArrowLeftIcon;
  ChevronRightIcon = ChevronRightIcon;
  salePrice: number = 0;
  paymenthMethod: 'bank' | 'cash' = 'cash';

  saleDetailsForm = new FormGroup({
    buyer: new FormControl(''),
  });

  inventoryProduct!: InventoryProduct | null;
  totalCost = 0;

  constructor(
    private _location: Location,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private formDataService: FormDataService
  ) {}

  ngOnInit() {
    const productID = Number(this.route.snapshot.paramMap.get('id'));

    this.inventoryProduct =
      this.productsService.getInventoryProductById(productID);

    const formData = this.formDataService.getFormData();

    this.salePrice = Number(formData.get('amount')) || 0;
    this.paymenthMethod = formData.get('paymentMethod') as 'bank' | 'cash';

    this.totalCost = this.inventoryProduct
      ? this.inventoryProduct.product.price +
        this.inventoryProduct.product.shippingCosts
      : 0;
  }

  goBack() {
    this._location.back();
  }

  calculateProfit(investedAmount: number, percentage: number) {
    const profit = this.salePrice * percentage - investedAmount;
    return profit;
  }

  formatCurrency(value: number) {
    return value.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
    });
  }

  async handleSubmit() {
    // TODO: call the API to save the sale
    const bodyData = {
      salePrice: this.salePrice,
      paymentMethod: this.paymenthMethod,
      inventoryProduct: this.inventoryProduct,
      buyer: this.saleDetailsForm.get('buyer')?.value,
    };

    console.log(bodyData);
  }
}
