import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InputRadioComponent } from '@shared/input-radio/input-radio.component';
import {
  LucideAngularModule,
  XIcon,
  BadgePlusIcon,
  BadgeMinusIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    InputRadioComponent,
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
})
export class IncomeComponent {
  XIcon = XIcon;
  BadgePlusIcon = BadgePlusIcon;
  BadgeMinusIcon = BadgeMinusIcon;

  paymentMethod = 'cash';
  isCash = this.paymentMethod === 'cash';
  isBank = this.paymentMethod === 'bank';

  // TODO Get the value from the input radio buttons and perform boolean checks on isCash and isCard
  // Basically from app-input-radio I should be able to update paymenthMethod value right here.
}
