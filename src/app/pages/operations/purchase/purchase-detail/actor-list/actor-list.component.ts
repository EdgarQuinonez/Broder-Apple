import { Component, Input } from '@angular/core';
import { ActorBase } from '../purchase-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-actor-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.scss',
})
export class ActorListComponent {
  @Input() actors!: ActorBase[];
  @Input() actorControls: any;
  @Input() totalCost!: number;
}
