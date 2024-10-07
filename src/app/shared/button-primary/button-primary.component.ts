import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChevronRightIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-button-primary',
  standalone: true,
  imports: [LucideAngularModule, NgClass],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.scss',
})
export class ButtonPrimaryComponent {
  @Input() type!: string;
  @Input() buttonText: string = 'Siguiente';
  @Input() bgColor: string = 'bg-primary';

  ChevronRightIcon = ChevronRightIcon;
}
