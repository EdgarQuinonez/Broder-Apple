import { Injectable, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActorBase } from '@pages/operations/purchase/purchase-detail/purchase-detail.component';
import { contributionsEqualTotalCostValidator } from '@validators/contributions-equal-total-cost.directive';
import { ActorService } from './actor.service';

@Injectable({
  providedIn: 'root',
})
export class ActorControlService {
  constructor(private fb: FormBuilder) {}

  toFormGroup(actors: ActorBase[], totalCost: number): FormGroup {
    const group = this.fb.group({
      paymentMethod: new FormControl('cash', Validators.required),
      actors: this.fb.array([]),
    });

    const actorFormArray = group.get('actors') as FormArray;
    actorFormArray.setValidators(
      contributionsEqualTotalCostValidator(totalCost)
    );
    actors.forEach((actor) => {
      actorFormArray.push(
        this.createActorGroup(actor, totalCost, actors.length)
      );
    });

    return group;
  }

  createActorGroup(
    actor: ActorBase,
    totalCost: number,
    numActors: number
  ): FormGroup {
    return this.fb.group({
      name: new FormControl(actor.name, Validators.required),
      // TODO: By default, distribute equally across all actors. However, an actor has a limited amount of money to contribute.
      quantity: new FormControl(totalCost / numActors, [
        Validators.required,
        Validators.min(0),
        Validators.max(totalCost),
      ]),
      percentage: new FormControl(actor.percentage, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
  }
}
