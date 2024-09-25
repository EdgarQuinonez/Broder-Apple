import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
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

  amount: number | string = 0;
  currentStyles = {};

  ngOnInit() {
    this.setCurrentStyles(); // Set initial styles for the input
  }

  // Function to update styles based on character length
  setCurrentStyles() {
    const characterLength = this.amount.toString().length;

    this.currentStyles = {
      width: characterLength + 'ch',
    };
  }

  // Handle input change
  onAmountChange(value: string) {
    this.setCurrentStyles();
  }

  // TODO: Get the value from the input radio buttons and perform boolean checks on isCash and isBank
  // Basically from app-input-radio I should be able to update paymentMethod value right here.
}
