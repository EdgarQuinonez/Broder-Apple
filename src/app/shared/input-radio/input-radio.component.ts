import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss',
})
export class InputRadioComponent {
  @Input() icon: any;
  @Input() title!: string;
  @Input() name!: string;
}
