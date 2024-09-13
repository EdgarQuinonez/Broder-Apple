import { Component } from '@angular/core';
import { HeaderComponent } from '@shared/header/header.component';
import { formatAccounting } from '@utils/formatAccounting';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  workingCapital = 11555.75;
  formattedWorkingCapital = formatAccounting(this.workingCapital);
}
