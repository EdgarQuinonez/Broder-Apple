import { Component, Input } from '@angular/core';
import { ActorBase } from '../purchase-detail.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  LockIcon,
  LockOpenIcon,
  LucideAngularModule,
  TrashIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-actor-list',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.scss',
})
export class ActorListComponent {
  @Input() actors!: ActorBase[];
  @Input() actorsFormArray!: FormArray;
  @Input() totalCost!: number;

  LockIcon = LockIcon;
  LockOpenIcon = LockOpenIcon;
  TrashIcon = TrashIcon;

  excludedActorIDs: string[] = [];
  disabledActorsInputs: boolean[] = [];

  getActorControls(actorIndex: number): FormGroup | null {
    return (this.actorsFormArray.at(actorIndex) as FormGroup) || null;
  }

  getActorQuantityControl(actorIndex: number): FormControl {
    const actorControl = this.getActorControls(actorIndex);
    return actorControl?.get('quantity') as FormControl;
  }

  getActorPercentageControl(actorIndex: number): FormControl {
    const actorControl = this.getActorControls(actorIndex);
    return actorControl?.get('percentage') as FormControl;
  }

  onQuantityChange(newQuantity: number, actorIndex: number): void {
    const actorControl = this.getActorControls(actorIndex);
    if (!actorControl) return;

    const excludeActorID = this.actors[actorIndex]?.name; // Ensure actor exists
    if (excludeActorID) {
      this.updateExcludedActors(excludeActorID);
      this.distributeContributions(newQuantity, this.excludedActorIDs);
    }
  }

  isActorExcluded(actorName: string): boolean {
    return this.excludedActorIDs.includes(actorName);
  }

  toggleActorLock(actorName: string): void {
    if (this.isActorExcluded(actorName)) {
      this.excludedActorIDs = this.excludedActorIDs.filter(
        (id) => id !== actorName
      );
    } else {
      this.excludedActorIDs.push(actorName);
    }
    this.updateActorInputsState();
  }

  updateActorInputsState(): void {
    this.actors.forEach((actor, index) => {
      const isDisabled = this.isActorExcluded(actor.name);
      const actorControl = this.actorsFormArray.at(index) as FormGroup;
      if (isDisabled) {
        actorControl.get('quantity')?.disable();
      } else {
        actorControl.get('quantity')?.enable();
      }
    });
  }

  updateExcludedActors(newExcludedActorID: string): void {
    const newExcludedActors = [...this.excludedActorIDs, newExcludedActorID];
    this.excludedActorIDs = newExcludedActors;
  }

  removeActor(actorIndex: number): void {
    this.actors.splice(actorIndex, 1);
    this.actorsFormArray.removeAt(actorIndex);
  }

  distributeContributions(
    newQuantity: number,
    excludedActorIDs: string[]
  ): void {
    const remainder = this.totalCost - newQuantity;

    const totalOtherQuantities = this.actors
      .filter((actor) => !excludedActorIDs.includes(actor.name))
      .reduce((sum, actor, index) => {
        const currentQuantity = this.sanitizeValue(
          this.actorsFormArray.at(index).get('quantity')?.value
        );
        return sum + currentQuantity;
      }, 0);

    if (totalOtherQuantities === 0) return;

    this.actors.forEach((actor, index) => {
      const actorControl = this.actorsFormArray.at(index) as FormGroup;
      if (!excludedActorIDs.includes(actor.name)) {
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
        // Set only the percentage for the excluded actors
        actorControl.patchValue({
          percentage: (newQuantity / this.totalCost) * 100 || 0,
        });
      }
    });
  }

  private sanitizeValue(value: any): number {
    return isNaN(value) || value === null || value === undefined ? 0 : value;
  }
}
