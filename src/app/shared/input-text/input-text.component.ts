import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor {
  onChange = (value: boolean) => {};

  @Input() name!: string;
  @Input() placeholder!: string;
  @Input() value!: string;

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  writeValue() {}
  registerOnTouched() {}
}
