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

@Component({
  selector: 'app-sale-details',
  standalone: true,
  imports: [LucideAngularModule],
  providers: [ProductsService, FormDataService],
  templateUrl: './sale-details.component.html',
  styleUrl: './sale-details.component.scss',
})
export class SaleDetailsComponent {
  ArrowLeftIcon = ArrowLeftIcon;
  ChevronRightIcon = ChevronRightIcon;

  inventoryProduct!: InventoryProduct | null;
  totalCost = this.inventoryProduct
    ? this.inventoryProduct.product.price +
      this.inventoryProduct.product.shippingCosts
    : 0;

  constructor(
    private _location: Location,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const productID = Number(this.route.snapshot.paramMap.get('id'));

    this.inventoryProduct =
      this.productsService.getInventoryProductById(productID);

    console.log(this.inventoryProduct);
  }

  goBack() {
    this._location.back();
  }
}
