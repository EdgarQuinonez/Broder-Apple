import { Routes } from '@angular/router';
import { LoginComponent } from '@pages/auth/login/login.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ExpenseComponent } from '@pages/operations/expense/expense.component';
import { IncomeComponent } from '@pages/operations/income/income.component';
import { PurchaseDetailComponent } from '@pages/operations/purchase/purchase-detail/purchase-detail.component';
import { PurchaseComponent } from '@pages/operations/purchase/purchase.component';
import { SaleDetailsComponent } from '@pages/operations/sale/sale-details/sale-details.component';
import { SalePriceComponent } from '@pages/operations/sale/sale-price/sale-price.component';
import { SaleComponent } from '@pages/operations/sale/sale.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  {
    path: 'auth',
    loadChildren: () => import('@pages/auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  {
    path: 'operation',
    loadChildren: () => import('@pages/operations/operations-routing.module').then(m => m.OperationsRoutingModule)
  }
];
