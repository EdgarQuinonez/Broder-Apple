import { Component, Input } from '@angular/core';
import { ChevronRightIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-button-primary',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.scss',
})
export class ButtonPrimaryComponent {
  @Input() type!: string;

  // TODO: Add possibility to change text content and bg color

  ChevronRightIcon = ChevronRightIcon;
}
