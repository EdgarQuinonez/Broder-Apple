import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-actor-list',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.scss',
})
export class ActorListComponent {
  @Input() totalCost!: number;

  transactionForm: FormGroup;
  actorList = [
    { id: 1, name: 'Investor 1', quantity: 50, percentage: 50 },
    { id: 2, name: 'Investor 2', quantity: 50, percentage: 50 },
  ];

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      actors: this.fb.array([]),
    });

    this.initializeActors();
  }

  get actors(): FormArray {
    return this.transactionForm.get('actors') as FormArray;
  }

  initializeActors() {
    this.actorList.forEach((actor) => {
      this.actors.push(
        this.fb.group({
          quantity: [actor.quantity, [Validators.required, Validators.min(0)]],
          percentage: [actor.percentage],
        })
      );
    });
  }

  recalculatePercentages() {
    const totalQuantity = this.getTotalQuantity();
    this.actors.controls.forEach((control, index) => {
      const quantity = control.get('quantity')!.value;
      const percentage = (quantity / totalQuantity) * 100;
      control.get('percentage')!.setValue(percentage, { emitEvent: false });
      this.actorList[index].percentage = percentage;
    });
  }

  getTotalQuantity(): number {
    return this.actors.controls
      .map((ctrl) => ctrl.get('quantity')!.value)
      .reduce((acc, curr) => acc + curr, 0);
  }
}
