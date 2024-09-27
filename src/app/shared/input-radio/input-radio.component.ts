import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true,
    },
  ],
})
export class InputRadioComponent implements ControlValueAccessor {
  onChange = (value: 'cash' | 'bank') => {};
  onTouched = () => {};

  @Input() icon: any;
  @Input() title!: string;
  @Input() name!: string;
  @Input() isChecked!: boolean;
  @Input() value!: string;

  isCash = this.value === 'cash';

  // Handle the onChange event when the input is checked
  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      this.onChange(this.value as 'cash' | 'bank');
    }
  }

  // ControlValueAccessor interface methods
  registerOnChange(fn: (value: 'cash' | 'bank') => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Update the state of the input when the form model changes
  writeValue(value: string): void {
    this.isChecked = value === this.value;
  }

  // Optional: to disable the radio input
  setDisabledState(isDisabled: boolean): void {
    // Implement if you want to handle disabled state
  }
}
