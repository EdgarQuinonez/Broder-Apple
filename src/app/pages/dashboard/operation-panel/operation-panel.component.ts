import { Component } from '@angular/core';
import { OperationBtnComponent } from './operation-btn/operation-btn.component';

@Component({
  selector: 'app-operation-panel',
  standalone: true,
  imports: [OperationBtnComponent],
  templateUrl: './operation-panel.component.html',
  styleUrl: './operation-panel.component.scss',
})
export class OperationPanelComponent {}
