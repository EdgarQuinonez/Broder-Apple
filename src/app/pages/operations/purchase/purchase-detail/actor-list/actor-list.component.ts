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
import { debounceTime } from 'rxjs';

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

  excludedActorIDs: Set<string> = new Set();
  disabledActorsInputs: boolean[] = [];

  ngOnInit() {
    let previousValues: ActorBase[] = this.actorsFormArray.getRawValue();

    if (this.actorsFormArray) {
      this.actorsFormArray.valueChanges
        .pipe(debounceTime(300))
        .subscribe((currentValues) => {
          const changedIndex = currentValues.findIndex(
            (value: ActorBase, index: number) =>
              value.quantity !== previousValues[index].quantity
          );
          previousValues = currentValues;

          if (changedIndex !== -1) {
            const newQuantity = currentValues[changedIndex].quantity;
            this.onQuantityChange(newQuantity, changedIndex);
          }
        });
    }
  }

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

    const excludeActorID = this.actors[actorIndex]?.name;
    if (excludeActorID) {
      this.excludedActorIDs.add(excludeActorID);
      this.distributeContributions(newQuantity, this.excludedActorIDs);
      this.excludedActorIDs.delete(excludeActorID);
    }
  }

  isActorExcluded(actorName: string): boolean {
    return this.excludedActorIDs.has(actorName);
  }

  toggleActorLock(actorName: string): void {
    if (this.isActorExcluded(actorName)) {
      this.excludedActorIDs.delete(actorName);
    } else {
      this.excludedActorIDs.add(actorName);
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

  removeActor(actorIndex: number): void {
    this.excludedActorIDs.delete(this.actors[actorIndex].name);
    this.actors.splice(actorIndex, 1);
    this.actorsFormArray.removeAt(actorIndex);

    // TODO: Implement a way to distribute the contributions when an actor is removed
    this.distributeContributions(this.totalCost, this.excludedActorIDs);
  }

  distributeContributions(
    newQuantity: number,
    excludedActorIDs: Set<string>
  ): void {
    const remainder = this.totalCost - newQuantity;

    const totalOtherQuantities = this.actors
      .filter((actor) => !excludedActorIDs.has(actor.name))
      .reduce((sum, actor, index) => {
        const currentQuantity = this.sanitizeValue(
          this.actorsFormArray.at(index).get('quantity')?.value
        );
        return sum + currentQuantity;
      }, 0);

    if (totalOtherQuantities === 0) return;

    this.actors.forEach((actor, index) => {
      const actorControl = this.actorsFormArray.at(index) as FormGroup;
      if (!excludedActorIDs.has(actor.name)) {
        const currentQuantity = this.sanitizeValue(
          actorControl.get('quantity')?.value
        );
        const newActorQuantity =
          (remainder * currentQuantity) / totalOtherQuantities;
        actorControl.patchValue(
          {
            quantity: newActorQuantity,
            percentage: (newActorQuantity / this.totalCost) * 100 || 0,
          },
          { emitEvent: false }
        );
      } else {
        // Set only the percentage for the excluded actors
        actorControl.patchValue(
          {
            percentage: (newQuantity / this.totalCost) * 100 || 0,
          },
          { emitEvent: false }
        );
      }
    });
  }

  private sanitizeValue(value: any): number {
    return isNaN(value) || value === null || value === undefined ? 0 : value;
  }
}
