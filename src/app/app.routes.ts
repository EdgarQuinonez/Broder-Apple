import { Routes } from '@angular/router';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { ExpenseComponent } from '@pages/operations/expense/expense.component';
import { IncomeComponent } from '@pages/operations/income/income.component';
import { PurchaseDetailComponent } from '@pages/operations/purchase/purchase-detail/purchase-detail.component';
import { PurchaseComponent } from '@pages/operations/purchase/purchase.component';
import { SaleComponent } from '@pages/operations/sale/sale.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'operation/income', component: IncomeComponent },
  { path: 'operation/expense', component: ExpenseComponent },
  { path: 'operation/purchase', component: PurchaseComponent },
  { path: 'operation/purchase/:id', component: PurchaseDetailComponent },
  { path: 'operation/sale', component: SaleComponent },
];
