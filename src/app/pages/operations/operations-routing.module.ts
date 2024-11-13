import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { PurchaseDetailComponent } from './purchase/purchase-detail/purchase-detail.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SaleDetailsComponent } from './sale/sale-details/sale-details.component';
import { SalePriceComponent } from './sale/sale-price/sale-price.component';
import { SaleComponent } from './sale/sale.component';

const routes: Routes = [
  { path: 'operation/income', component: IncomeComponent },
  { path: 'operation/expense', component: ExpenseComponent },
  { path: 'operation/purchase', component: PurchaseComponent },
  { path: 'operation/purchase/:id', component: PurchaseDetailComponent },
  { path: 'operation/sale', component: SaleComponent },
  { path: 'operation/sale/:id/sale-price', component: SalePriceComponent },
  { path: 'operation/sale/:id/sale-details', component: SaleDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
