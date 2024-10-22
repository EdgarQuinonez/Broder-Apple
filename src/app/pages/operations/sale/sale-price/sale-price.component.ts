import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { ButtonPrimaryComponent } from '@shared/button-primary/button-primary.component';
import { InputRadioComponent } from '@shared/input-radio/input-radio.component';
import { InputTextComponent } from '@shared/input-text/input-text.component';
import {
  ArrowLeftIcon,
  BanknoteIcon,
  CreditCardIcon,
  LucideAngularModule,
  XIcon,
} from 'lucide-angular';
import { Location } from '@angular/common';
import { FormDataService } from '@services/form-data.service';

@Component({
  selector: 'app-sale-price',
  standalone: true,
  imports: [
    InputRadioComponent,
    InputTextComponent,
    ButtonPrimaryComponent,
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
    NgStyle,
    ReactiveFormsModule,
  ],
  providers: [FormDataService],
  templateUrl: './sale-price.component.html',
  styleUrl: './sale-price.component.scss',
})
export class SalePriceComponent {
  XIcon = XIcon;
  BanknoteIcon = BanknoteIcon;
  CreditCardIcon = CreditCardIcon;
  ArrowLeftIcon = ArrowLeftIcon;

  paymentMethod = 'cash';
  isCash = this.paymentMethod === 'cash';
  isBank = this.paymentMethod === 'bank';

  transactionForm = new FormGroup({
    amount: new FormControl(0),
    paymentMethod: new FormControl('cash'),
  });

  currentStyles = {};

  constructor(
    private _location: Location,
    private formDataService: FormDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  goBack() {
    this._location.back();
  }

  ngOnInit() {
    this.setCurrentStyles();
  }

  setCurrentStyles() {
    // const characterLength = this.amount.toString().length;
    const characterLength =
      this.transactionForm.value.amount?.toString().length;

    this.currentStyles = {
      width: characterLength + 'ch',
    };
  }

  onAmountChange(value: string) {
    this.setCurrentStyles();
  }

  async handleSubmit() {
    const productID = this.route.snapshot.paramMap.get('id');
    const values = this.transactionForm.value;

    // TODO: Run validation on the form data before appending it to the FormData object
    this.formDataService.appendFormData('amount', values.amount);
    this.formDataService.appendFormData('paymentMethod', values.paymentMethod);
    // TODO: Only navigate to the next page if the form data is valid

    this.router.navigate([`/operation/sale/${productID}/sale-details`]);
  }
}
