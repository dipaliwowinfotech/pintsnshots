import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaproomProductComponent } from './taproom-product.component';

describe('TaproomProductComponent', () => {
  let component: TaproomProductComponent;
  let fixture: ComponentFixture<TaproomProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaproomProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaproomProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
