import { Component } from '@angular/core';
import { ChevronRightIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-button-primary',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.scss',
})
export class ButtonPrimaryComponent {
  ChevronRightIcon = ChevronRightIcon;
}
