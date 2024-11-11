import { Component } from '@angular/core';
import { environment } from '@environment/environment';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    TransactionFormComponent
  ],
  template: '<app-transaction-form [apiEndpoint]=apiEndpoint [title]=title></app-transaction-form>'
  
})
export class IncomeComponent {
  apiEndpoint =`${environment.api_base_url}/finance/transactions/income/`;
  title = "Registrar ingreso" 
}
