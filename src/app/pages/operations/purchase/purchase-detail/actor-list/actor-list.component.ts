import { Component, Input } from '@angular/core';
import { ActorBase } from '../purchase-detail.component';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-actor-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.scss',
})
export class ActorListComponent {
  @Input() actors!: ActorBase[];
  @Input() actorControls!: any;
  @Input() totalCost!: number;

  onQuantityChange(newQuantity: number, actorIndex: number): void {
    const excludeActorID = this.actors[actorIndex].name; // TODO: When api is ready, use actor ID
    this.distributeContributions(newQuantity, excludeActorID);
  }

  // Distributes contributions among other actors, keeping the total investment constant
  distributeContributions(newQuantity: number, excludeActorID: string): void {
    const remainder = this.totalCost - newQuantity;

    // Find the total quantity of all other actors, handling null/NaN cases
    const totalOtherQuantities = this.actors
      .filter((actor) => actor.name !== excludeActorID)
      .reduce((sum, actor, index) => {
        const currentQuantity = this.sanitizeValue(
          this.actorControls.at(index).get('quantity')?.value
        );
        return sum + currentQuantity;
      }, 0);

    // Avoid division by zero by handling case when totalOtherQuantities is 0
    if (totalOtherQuantities === 0) return;

    // Update the quantities and percentages of the other actors
    this.actors.forEach((actor, index) => {
      const actorControl = this.actorControls.at(index) as FormGroup;
      if (actor.name !== excludeActorID) {
        const currentQuantity = this.sanitizeValue(
          actorControl.get('quantity')?.value
        );
        const newActorQuantity =
          (remainder * currentQuantity) / totalOtherQuantities;
        actorControl.patchValue({
          quantity: newActorQuantity,
          percentage: (newActorQuantity / this.totalCost) * 100 || 0,
        });
      } else {
        // Update the percentage for the actor that was changed
        actorControl.patchValue({
          percentage: (newQuantity / this.totalCost) * 100 || 0,
        });
      }
    });
  }

  // Helper method to sanitize values (converting null, undefined, or NaN to 0)
  private sanitizeValue(value: any): number {
    return isNaN(value) || value === null || value === undefined ? 0 : value;
  }
}
