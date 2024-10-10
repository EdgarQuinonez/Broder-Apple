import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {
  ArrowLeftIcon,
  BanknoteIcon,
  ChevronRightIcon,
  CreditCardIcon,
  LucideAngularModule,
  PlusIcon,
} from 'lucide-angular';
import { Location } from '@angular/common'; // Import Location service
import { InputRadioComponent } from '@shared/input-radio/input-radio.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ActorListComponent } from './actor-list/actor-list.component';
import { ProductsService } from '@services/products.service';
import { Product } from '@types';
import { ActorControlService } from '@services/actor-control.service';
import { ActorService } from '@services/actor.service';

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

  contributionForm!: FormGroup;
  actors: ActorBase[] = [];

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private productsService: ProductsService,
    private actorControlService: ActorControlService,
    private actorService: ActorService
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

    this.actorService.getActors().subscribe((actors) => {
      this.actors = actors;
      this.contributionForm = this.actorControlService.toFormGroup(this.actors);
    });
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
