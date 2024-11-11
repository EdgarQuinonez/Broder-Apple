import { Component } from '@angular/core';
import { ButtonPrimaryComponent } from '@shared/button-primary/button-primary.component';
import { InputTextComponent } from '@shared/input-text/input-text.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextComponent, ButtonPrimaryComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
