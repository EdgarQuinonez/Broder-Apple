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
      actorFormArray.push(this.createActorGroup(actor, totalCost));
    });

    return group;
  }

  createActorGroup(actor: ActorBase, totalCost: number): FormGroup {
    return this.fb.group({
      name: new FormControl(actor.name, Validators.required),
      quantity: new FormControl(actor.quantity, [
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
