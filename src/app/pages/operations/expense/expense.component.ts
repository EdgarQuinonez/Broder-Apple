import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '@environment/environment';
import { ButtonPrimaryComponent } from '@shared/button-primary/button-primary.component';
import { InputRadioComponent } from '@shared/input-radio/input-radio.component';
import { InputTextComponent } from '@shared/input-text/input-text.component';
import axios from 'axios';
import {
  LucideAngularModule,
  XIcon,
  BanknoteIcon,
  CreditCardIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-expense',
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
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
})
export class ExpenseComponent {
  // TODO: Refactor Income and ExpenseComponent to use a shared component for the form

  XIcon = XIcon;
  BanknoteIcon = BanknoteIcon;
  CreditCardIcon = CreditCardIcon;

  paymentMethod = 'cash';
  isCash = this.paymentMethod === 'cash';
  isBank = this.paymentMethod === 'bank';

  transactionForm = new FormGroup({
    type: new FormControl('expense'),
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
    const apiEndpoint = `${environment.api_base_url}/transaction/expense/`;
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
