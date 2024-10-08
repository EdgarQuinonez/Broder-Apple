import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationPanelComponent } from './operation-panel.component';

describe('OperationPanelComponent', () => {
  let component: OperationPanelComponent;
  let fixture: ComponentFixture<OperationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
