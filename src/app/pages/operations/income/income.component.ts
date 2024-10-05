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
import { environment } from '@environment/environment';
import axios from 'axios';

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

  async handleSubmit() {
    const apiEndpoint = `${environment.api_base_url}/transaction/income/`;
    try {
      const response = await axios.post(apiEndpoint, {
        type: this.transactionForm.value.type,
        amount: this.transactionForm.value.amount,
        description: this.transactionForm.value.description,
        paymentMethod: this.transactionForm.value.paymentMethod,
      });

      if (response.status === 200) {
        console.log('Transaction added successfully');
        response.data;
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error('Axios error: ', e.response?.data);
      } else {
        console.error('Unexpected error: ', e);
      }
    }
  }
}
