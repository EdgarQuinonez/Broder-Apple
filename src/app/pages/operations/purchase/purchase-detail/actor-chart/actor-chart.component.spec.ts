import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorChartComponent } from './actor-chart.component';

describe('ActorChartComponent', () => {
  let component: ActorChartComponent;
  let fixture: ComponentFixture<ActorChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
