import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InputRadioComponent } from '@shared/input-radio/input-radio.component';
import { LucideAngularModule, XIcon } from 'lucide-angular';

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
}
