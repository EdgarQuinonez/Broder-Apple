import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
  FormArray,
} from '@angular/forms';

/** Validator function that checks if contributions equal total cost with a tolerance margin */
export function contributionsEqualTotalCostValidator(
  totalCost: number,
  tolerance: number = 0.01
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as FormArray;
    if (
      !formArray ||
      !formArray.controls ||
      !Array.isArray(formArray.controls)
    ) {
      return null;
    }

    const totalContributions = formArray.controls.reduce(
      (sum, actorControl) => {
        const quantity = actorControl.get('quantity')?.value;
        return sum + (quantity ? +quantity : 0);
      },
      0
    );

    const withinMargin = Math.abs(totalContributions - totalCost) <= tolerance;

    return withinMargin ? null : { contributionsNotEqualTotalCost: true };
  };
}

@Directive({
  selector: '[appContributionsEqualTotalCost]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ContributionsEqualTotalCostDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class ContributionsEqualTotalCostDirective implements Validator {
  @Input('appContributionsEqualTotalCost') totalCost!: number;

  validate(control: AbstractControl): ValidationErrors | null {
    return contributionsEqualTotalCostValidator(this.totalCost)(control);
  }
}
