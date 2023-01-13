import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponentsComponent } from './product-components.component';

describe('ProductComponentsComponent', () => {
  let component: ProductComponentsComponent;
  let fixture: ComponentFixture<ProductComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
