import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePriceComponent } from './sale-price.component';

describe('SalePriceComponent', () => {
  let component: SalePriceComponent;
  let fixture: ComponentFixture<SalePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalePriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
