import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { XIcon, BanknoteIcon, CreditCardIcon, LucideAngularModule } from 'lucide-angular';
import { NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonPrimaryComponent } from '@shared/button-primary/button-primary.component';
import { InputRadioComponent } from '@shared/input-radio/input-radio.component';
import { InputTextComponent } from '@shared/input-text/input-text.component';

@Component({
  selector: 'app-transaction-form',
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
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  @Input() title: string = "";
  @Input() apiEndpoint!: string;  // Endpoint will be set based on income/expense
  XIcon = XIcon;
  BanknoteIcon = BanknoteIcon;
  CreditCardIcon = CreditCardIcon;

  transactionForm = new FormGroup({
    amount: new FormControl(0),
    description: new FormControl(''),
    paymentMethod: new FormControl('cash'),
  });

  currentStyles = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.setCurrentStyles();
  }

  setCurrentStyles() {
    const characterLength = this.transactionForm.value.amount?.toString().length;
    this.currentStyles = {
      width: characterLength + 'ch',
    };
  }

  onAmountChange() {
    this.setCurrentStyles();
  }

  handleSubmit() {
    this.http.post(this.apiEndpoint, this.transactionForm.value).subscribe({
      next: (response) => {
        console.log('Transaction added successfully', response);
      },
      error: (error) => {
        console.error('HTTP error: ', error);
      },
    });
  }
}
