import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationBtnComponent } from './operation-btn.component';

describe('OperationBtnComponent', () => {
  let component: OperationBtnComponent;
  let fixture: ComponentFixture<OperationBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
