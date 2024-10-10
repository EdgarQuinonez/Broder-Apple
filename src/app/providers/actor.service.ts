import { Injectable } from '@angular/core';
import { ActorBase } from '@pages/operations/purchase/purchase-detail/purchase-detail.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  // TODO: Get actors from API

  private actors: ActorBase[] = [
    new ActorBase({ name: 'John Doe', quantity: 0, percentage: 0 }),
    new ActorBase({ name: 'Jane Smith', quantity: 0, percentage: 0 }),
    new ActorBase({ name: 'Alice Johnson', quantity: 0, percentage: 0 }),
  ];

  constructor() {}

  getActors(): Observable<ActorBase[]> {
    return of(this.actors);
  }
}
