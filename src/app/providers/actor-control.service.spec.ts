import { TestBed } from '@angular/core/testing';

import { ActorControlService } from './actor-control.service';

describe('ActorControlService', () => {
  let service: ActorControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActorControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
