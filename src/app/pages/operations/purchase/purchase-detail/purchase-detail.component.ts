import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
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
import { Location, NgClass } from '@angular/common';
import { InputRadioComponent } from '@shared/input-radio/input-radio.component';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ActorListComponent } from './actor-list/actor-list.component';
import { ProductsService } from '@services/products.service';
import { Product } from '@types';
import { ActorControlService } from '@services/actor-control.service';
import { ActorService } from '@services/actor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-purchase-detail',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
    InputRadioComponent,
    ReactiveFormsModule,
    ActorListComponent,
    NgClass,
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

  allProducts: Product[] = [];
  product$!: Observable<Product>;

  contributionForm!: FormGroup;
  actors: ActorBase[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private productsService: ProductsService,
    private actorControlService: ActorControlService,
    private actorService: ActorService
  ) {
    this.allProducts = this.productsService.getAllProducts();
  }

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedProduct = this.productsService.getProductById(productId);

    this.totalCost =
      this.selectedProduct.price + this.selectedProduct.shippingCosts;

    this.actorService.getActors().subscribe((actors) => {
      this.actors = actors;
      this.contributionForm = this.actorControlService.toFormGroup(
        this.actors,
        this.totalCost
      );
    });
  }

  get actorFormArray(): FormArray {
    return this.contributionForm.get('actors') as FormArray;
  }

  goBack() {
    this._location.back();
  }

  // TODO: Perform double entry accounting movements for the purchase and add the purchased item to inventory.
  handleSubmit() {
    const bodyData = {
      product: this.selectedProduct,
      actors: this.contributionForm.value.actors,
      paymentMethod: this.contributionForm.value.paymentMethod,
      totalCost: this.totalCost,
    };

    console.log(bodyData);

    // TODO: Once transaction is successful, it should create a row for Inventory for new product.
    // TODO: Debit the Inventory account and credit the Cash/Bank account for each actor.
  }
}

export class ActorBase {
  quantity: number;
  percentage: number;
  name: string;

  constructor(
    options: {
      quantity?: number;
      percentage?: number;
      name: string;
    } = { name: '' }
  ) {
    this.quantity = options.quantity || 0;
    this.percentage = options.percentage || 0;
    this.name = options.name || '';
  }
}
