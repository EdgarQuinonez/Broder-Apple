import { Component, Input } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  BadgePlusIcon,
  BadgeMinusIcon,
  BanknoteIcon,
  ShoppingBagIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-operation-btn',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './operation-btn.component.html',
  styleUrls: ['./operation-btn.component.scss'],
})
export class OperationBtnComponent {
  @Input({ required: true }) type!: 'income' | 'expense' | 'purchase' | 'sale';

  icon: any;
  title: string;
  operationPath = '/operation';

  constructor() {
    this.icon = BadgePlusIcon;
    this.title = 'Ingreso';
  }

  ngOnInit() {
    switch (this.type) {
      case 'income':
        this.icon = BadgePlusIcon;
        this.title = 'Ingreso';
        this.operationPath = '/operation/income';
        break;
      case 'expense':
        this.icon = BadgeMinusIcon;
        this.title = 'Egreso';
        this.operationPath = '/operation/expense';
        break;
      case 'purchase':
        this.icon = ShoppingBagIcon;
        this.title = 'Compra';
        this.operationPath = '/operation/purchase';
        break;
      case 'sale':
        this.icon = BanknoteIcon;
        this.title = 'Venta';
        this.operationPath = '/operation/sale';
        break;
    }
  }
}
