import { Component, Input } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  BadgePlusIcon,
  BadgeMinusIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-operation-btn',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './operation-btn.component.html',
  styleUrl: './operation-btn.component.scss',
})
export class OperationBtnComponent {
  @Input({ required: true }) type!: 'income' | 'expense';

  icon: any;
  title: string;
  operationPath = '/operation';

  constructor() {
    this.icon = BadgePlusIcon;
    this.title = 'Ingreso';
  }

  ngOnInit() {
    if (this.type === 'income') {
      this.icon = BadgePlusIcon;
      this.title = 'Ingreso';
      this.operationPath = '/operation/income';
    } else {
      this.icon = BadgeMinusIcon;
      this.title = 'Egreso';
      this.operationPath = '/operation/expense';
    }
  }
}
