import { Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActorBase } from '@pages/operations/purchase/purchase-detail/purchase-detail.component';

@Injectable({
  providedIn: 'root',
})
export class ActorControlService {
  constructor(private fb: FormBuilder) {}

  toFormGroup(actors: ActorBase[]): FormGroup {
    const group = this.fb.group({
      paymentMethod: new FormControl('', Validators.required),
      actors: this.fb.array([]),
    });

    const actorFormArray = group.get('actors') as FormArray;
    actors.forEach((actor) =>
      actorFormArray.push(this.createActorGroup(actor))
    );

    return group;
  }

  createActorGroup(actor: ActorBase): FormGroup {
    return this.fb.group({
      name: new FormControl(actor.name, Validators.required),
      quantity: new FormControl(actor.quantity, [
        Validators.required,
        Validators.min(0),
      ]),
      percentage: new FormControl(actor.percentage, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
  }
}
