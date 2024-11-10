import { Component } from '@angular/core';
import { environment } from '@environment/environment';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    TransactionFormComponent
  ],
  template: '<app-transaction-form [apiEndpoint]=apiEndpoint [title]=title></app-transaction-form>'
  
})
export class ExpenseComponent {
  apiEndpoint =`${environment.api_base_url}/transaction/expense/`;
  title = "Registrar gasto" 
}
