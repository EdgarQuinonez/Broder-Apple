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

  transactionForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      paymentMethod: ['cash', Validators.required],
      actors: this.fb.array([]),
    });
  }

  get actors(): FormArray {
    return this.transactionForm.get('actors') as FormArray;
  }

  ngOnInit() {
    // Fetch the product ID from the route
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    // Find the selected product from the mocked data
    this.selectedProduct = this.allProducts.find(
      (product) => product.id === productId
    );

    this.totalCost =
      this.selectedProduct.price + this.selectedProduct.shippingCosts;

    // Initialize actors form array
    this.initializeActors();

    // Initialize Doughnut Chart Labels and Data
    this.updateChart();
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  initializeActors() {
    const initialActors = this.actorList.length;
    const equalQuantity = Math.floor(this.totalCost / initialActors);
    const remainder = this.totalCost - equalQuantity * initialActors;

    this.actorList.forEach((actor, index) => {
      const quantity = equalQuantity + (index < remainder ? 1 : 0);
      this.actors.push(
        this.fb.group({
          quantity: [quantity, [Validators.required, Validators.min(0)]],
          percentage: [
            this.calculatePercentage(quantity),
            [Validators.required, Validators.min(0), Validators.max(100)],
          ],
        })
      );
    });

    // Subscribe to quantity changes
    this.subscribeToQuantityChanges();
  }
  onQuantityChange(changedIndex: number, newQuantity: number) {
    if (isNaN(newQuantity) || newQuantity < 0) {
      newQuantity = 0;
      this.actors.at(changedIndex).get('quantity')!.setValue(newQuantity, {
        emitEvent: false,
      });
    }

    // Get the total quantity allocated by all actors
    const totalAllocated = this.getTotalQuantity();

    // If the new allocation exceeds totalCost, adjust the changed quantity
    if (totalAllocated > this.totalCost) {
      const excess = totalAllocated - this.totalCost;
      newQuantity -= excess;
      this.actors.at(changedIndex).get('quantity')!.setValue(newQuantity, {
        emitEvent: false,
      });
    }

    // Calculate the remaining amount to be distributed
    const remaining = this.totalCost - this.getTotalQuantity();

    // If there's any remaining amount, distribute it proportionally
    if (remaining > 0) {
      this.distributeRemainingProportionally(changedIndex, remaining);
    }

    // Recalculate percentages after the distribution
    this.recalculatePercentages();

    // Update the chart
    this.updateChart();
  }

  distributeRemainingProportionally(excludeIndex: number, remaining: number) {
    const totalQuantity = this.getTotalQuantity();

    // Get the actors excluding the one that was changed
    const adjustableActors = this.actors.controls
      .map((ctrl, idx) => (idx !== excludeIndex ? ctrl : null))
      .filter((ctrl) => ctrl !== null);

    // Calculate total percentage of other actors
    const totalPercentage = adjustableActors.reduce((acc, ctrl) => {
      const qty = ctrl!.get('quantity')!.value;
      return acc + qty / totalQuantity;
    }, 0);

    // Distribute the remaining quantity proportionally based on previous percentages
    adjustableActors.forEach((ctrl) => {
      const currentQty = ctrl!.get('quantity')!.value;
      const proportion = currentQty / totalQuantity;
      const addQty = proportion * remaining;

      ctrl!
        .get('quantity')!
        .setValue(currentQty + addQty, { emitEvent: false });
    });
  }

  recalculatePercentages() {
    const total = this.getTotalQuantity();
    this.actors.controls.forEach((control) => {
      const qty = control.get('quantity')!.value;
      const percentage = total > 0 ? (qty / total) * 100 : 0;
      control.get('percentage')!.setValue(parseFloat(percentage.toFixed(2)), {
        emitEvent: false,
      });
    });
  }

  calculatePercentage(quantity: number): number {
    return this.totalCost > 0
      ? parseFloat(((quantity / this.totalCost) * 100).toFixed(2))
      : 0;
  }

  getTotalQuantity(): number {
    return this.actors.controls
      .map((ctrl) => ctrl.get('quantity')!.value)
      .reduce((acc, curr) => acc + curr, 0);
  }

  addActor() {
    const newActorIndex = this.actors.length;
    const equalQuantity = Math.floor(this.totalCost / (newActorIndex + 1));
    const remainder = this.totalCost - equalQuantity * (newActorIndex + 1);

    this.actors.push(
      this.fb.group({
        quantity: [
          equalQuantity + (newActorIndex < remainder ? 1 : 0),
          [Validators.required, Validators.min(0)],
        ],
        percentage: [
          this.calculatePercentage(
            equalQuantity + (newActorIndex < remainder ? 1 : 0)
          ),
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
      })
    );

    // Update actorList
    // this.actorList.push({
    //   id: Date.now(), // Unique ID
    //   name: `Investor ${this.actorList.length + 1}`,
    // });

    // Subscribe to the new actor's quantity changes
    const newControl = this.actors.at(this.actors.length - 1);
    const sub = newControl.get('quantity')!.valueChanges.subscribe((value) => {
      this.onQuantityChange(this.actors.length - 1, value);
    });
    this.subscriptions.push(sub);

    // Recalculate distributions
    this.distributeAllQuantities();

    // Recalculate percentages
    this.recalculatePercentages();

    // Update the chart
    this.updateChart();
  }

  removeActor(index: number): void {
    if (this.actors.length <= 1) {
      // Prevent removing the last actor
      return;
    }

    const removedQuantity = this.actors.at(index).get('quantity')!.value;
    this.actors.removeAt(index);
    this.actorList.splice(index, 1);

    // Remove corresponding subscription
    this.subscriptions.splice(index, 1);

    // Redistribute the removed quantity among remaining actors
    this.distributeRemovedQuantity(removedQuantity);

    // Recalculate percentages
    this.recalculatePercentages();

    // Update the chart
    this.updateChart();
  }

  distributeAllQuantities() {
    const equalQuantity = Math.floor(this.totalCost / this.actors.length);
    const remainder = this.totalCost - equalQuantity * this.actors.length;

    this.actors.controls.forEach((ctrl, idx) => {
      let qty = equalQuantity + (idx < remainder ? 1 : 0);
      ctrl.get('quantity')!.setValue(qty, { emitEvent: false });
    });
  }

  distributeRemovedQuantity(removedQuantity: number) {
    const adjustableActors = this.actors.controls;
    const numberOfAdjustable = adjustableActors.length;

    if (numberOfAdjustable > 0) {
      const adjustment = Math.floor(removedQuantity / numberOfAdjustable);
      const extra = removedQuantity % numberOfAdjustable;

      adjustableActors.forEach((ctrl, idx) => {
        let qty =
          ctrl.get('quantity')!.value + adjustment + (idx < extra ? 1 : 0);
        qty = Math.min(qty, this.totalCost); // Ensure not exceeding totalCost
        ctrl.get('quantity')!.setValue(qty, { emitEvent: false });
      });
    }
  }

  distributeRemainingAfterAddOrRemove() {
    const totalAllocated = this.getTotalQuantity();
    const remaining = this.totalCost - totalAllocated;

    if (remaining > 0) {
      const adjustableActors = this.actors.controls;
      const numberOfAdjustable = adjustableActors.length;

      if (numberOfAdjustable > 0) {
        const adjustment = Math.floor(remaining / numberOfAdjustable);
        const extra = remaining % numberOfAdjustable;

        adjustableActors.forEach((ctrl, idx) => {
          let qty =
            ctrl.get('quantity')!.value + adjustment + (idx < extra ? 1 : 0);
          ctrl.get('quantity')!.setValue(qty, { emitEvent: false });
        });
      }
    }
  }

  distributeAll() {
    const equalQuantity = Math.floor(this.totalCost / this.actors.length);
    const remainder = this.totalCost - equalQuantity * this.actors.length;

    this.actors.controls.forEach((ctrl, idx) => {
      let qty = equalQuantity + (idx < remainder ? 1 : 0);
      ctrl.get('quantity')!.setValue(qty, { emitEvent: false });
    });
  }

  distributeAfterChange() {
    const totalAllocated = this.getTotalQuantity();
    const remaining = this.totalCost - totalAllocated;

    if (remaining > 0) {
      const adjustableActors = this.actors.controls.filter(
        (ctrl) => ctrl.get('quantity')!.value > 0
      );
      const numberOfAdjustable = adjustableActors.length;

      if (numberOfAdjustable > 0) {
        const adjustment = Math.floor(remaining / numberOfAdjustable);
        const extra = remaining % numberOfAdjustable;

        adjustableActors.forEach((ctrl, idx) => {
          let qty =
            ctrl.get('quantity')!.value + adjustment + (idx < extra ? 1 : 0);
          ctrl.get('quantity')!.setValue(qty, { emitEvent: false });
        });
      }
    }
  }

  distributeAllQuantitiesProperly() {
    const totalAllocated = this.getTotalQuantity();
    if (totalAllocated !== this.totalCost) {
      this.distributeAfterChange();
    }
  }

  recalculateAll() {
    this.recalculatePercentages();
    this.updateChart();
  }

  // Update the Doughnut Chart
  updateChart() {
    this.doughnutChartLabels = this.actorList.map((actor) => actor.name);
    this.doughnutChartDatasets[0].data = this.actors.controls.map(
      (ctrl) => ctrl.get('quantity')!.value
    );
  }

  // Remove all existing subscriptions before re-subscribing
  resetSubscriptions() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
    this.subscribeToQuantityChanges();
  }

  subscribeToQuantityChanges() {
    this.actors.controls.forEach((control, index) => {
      const sub = control.get('quantity')!.valueChanges.subscribe((value) => {
        this.onQuantityChange(index, value);
      });
      this.subscriptions.push(sub);
    });
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
