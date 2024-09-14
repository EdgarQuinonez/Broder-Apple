import { Routes } from '@angular/router';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { IncomeComponent } from '@pages/operations/income/income.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'operation/income', component: IncomeComponent },
];
