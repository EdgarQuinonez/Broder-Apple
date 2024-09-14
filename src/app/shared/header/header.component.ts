import { Component } from '@angular/core';
import { LucideAngularModule, UserIcon } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // TODO: Should get title from routes?
  title = 'Dashboard';
  UserIcon = UserIcon;
}
