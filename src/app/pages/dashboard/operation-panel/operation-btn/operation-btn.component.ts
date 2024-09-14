import { Component, Input } from '@angular/core';
import {
  LucideAngularModule,
  BadgePlusIcon,
  BadgeMinusIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-operation-btn',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './operation-btn.component.html',
  styleUrl: './operation-btn.component.scss',
})
export class OperationBtnComponent {
  @Input({ required: true }) type!: 'income' | 'expense';

  icon: any;
  title: string;

  constructor() {
    this.icon = BadgePlusIcon;
    this.title = 'Ingreso';
  }

  ngOnInit() {
    if (this.type === 'income') {
      this.icon = BadgePlusIcon;
      this.title = 'Ingreso';
    } else {
      this.icon = BadgeMinusIcon;
      this.title = 'Egreso';
    }
  }
}
