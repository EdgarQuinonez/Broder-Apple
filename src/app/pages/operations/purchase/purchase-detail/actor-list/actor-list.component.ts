import { Component, Input } from '@angular/core';
import { ActorBase } from '../purchase-detail.component';

@Component({
  selector: 'app-actor-list',
  standalone: true,
  imports: [],
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.scss',
})
export class ActorListComponent {
  @Input() actors!: ActorBase[];
  @Input() totalCost!: number;
}
