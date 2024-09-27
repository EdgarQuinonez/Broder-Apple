import { Component, forwardRef } from '@angular/core';
import { NgStyle } from '@angular/common';
import {
  FormsModule,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InputRadioComponent } from '@shared/input-radio/input-radio.component';
import {
  LucideAngularModule,
  XIcon,
  BanknoteIcon,
  CreditCardIcon,
} from 'lucide-angular';
import { InputTextComponent } from '@shared/input-text/input-text.component';
import { ButtonPrimaryComponent } from '@shared/button-primary/button-primary.component';

@Component({
  selector: 'app-income',
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
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent {
  XIcon = XIcon;
  BanknoteIcon = BanknoteIcon;
  CreditCardIcon = CreditCardIcon;

  paymentMethod = 'cash';
  isCash = this.paymentMethod === 'cash';
  isBank = this.paymentMethod === 'bank';

  transactionForm = new FormGroup({
    type: new FormControl('income'),
    amount: new FormControl(0),
    description: new FormControl(''),
    paymentMethod: new FormControl('cash'),
  });

  currentStyles = {};

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

  handleSubmit() {
    console.log(this.transactionForm.value);
  }
}
