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
            this.onQuantityChange(changedIndex);
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

  onQuantityChange(actorIndex: number): void {
    const actorControl = this.getActorControls(actorIndex);

    if (!actorControl) return;

    const excludeActorID = this.actors[actorIndex]?.name;
    if (excludeActorID) {
      this.excludedActorIDs.add(excludeActorID);
      this.distributeContributions();
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

    // this.updateActorInputsState();
  }

  // updateActorInputsState(): void {
  //   this.actors.forEach((actor, index) => {
  //     const isDisabled = this.isActorExcluded(actor.name);
  //     const actorControl = this.actorsFormArray.at(index) as FormGroup;
  //     if (isDisabled) {
  //       actorControl.get('quantity')?.disable({ emitEvent: false });
  //     } else {
  //       actorControl.get('quantity')?.enable({ emitEvent: false });
  //     }
  //   });
  // }

  removeActor(actorIndex: number): void {
    this.excludedActorIDs.delete(this.actors[actorIndex].name);
    this.actors.splice(actorIndex, 1);
    this.actorsFormArray.removeAt(actorIndex);

    // TODO: Implement a way to distribute the contributions when an actor is removed
    this.distributeContributions();
  }

  distributeContributions(): void {
    const excludedActorsSum = this.actorsFormArray.controls.reduce(
      (sum, actor) => {
        const actorName = actor.get('name')?.value;
        const actorQuantity = this.sanitizeValue(actor.get('quantity')?.value);

        return this.isActorExcluded(actorName) ? sum + actorQuantity : sum;
      },
      0
    );
    // Quantity that will be distributed among the actors that are not excluded
    // TODO: totalCost to be replaced with available budget (which ideally equals the totalCost)
    const remainder = this.totalCost - excludedActorsSum;

    const includedActorsSum = this.actorsFormArray.controls.reduce(
      (sum, actor) => {
        const actorName = actor.get('name')?.value;
        const actorQuantity = this.sanitizeValue(actor.get('quantity')?.value);

        return this.isActorExcluded(actorName) ? sum : sum + actorQuantity;
      },
      0
    );

    this.actorsFormArray.controls.forEach((actor) => {
      const actorName = actor.get('name')?.value;
      const actorQuantity = this.sanitizeValue(actor.get('quantity')?.value);

      if (this.totalCost === 0) {
        console.warn('Total cost is 0, cannot distribute contributions.');
        return;
      }

      if (this.isActorExcluded(actorName)) {
        // No quantity changes, only percentage changes
        actor
          .get('percentage')
          ?.setValue((actorQuantity / this.totalCost) * 100 || 0, {
            emitEvent: false,
          });
      } else {
        if (includedActorsSum === 0) {
          console.warn(
            'Included actors sum is 0, cannot distribute remaining contributions.'
          );
          return;
        }

        const newQuantity = remainder * (actorQuantity / includedActorsSum);
        actor.get('quantity')?.setValue(newQuantity, { emitEvent: false });
        actor
          .get('percentage')
          ?.setValue((newQuantity / this.totalCost) * 100, {
            emitEvent: false,
          });
      }
    });
  }

  private sanitizeValue(value: any): number {
    return isNaN(value) || value === null || value === undefined ? 0 : value;
  }
}
