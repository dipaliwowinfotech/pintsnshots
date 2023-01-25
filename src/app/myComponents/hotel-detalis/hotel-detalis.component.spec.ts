import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelDetalisComponent } from './hotel-detalis.component';

describe('HotelDetalisComponent', () => {
  let component: HotelDetalisComponent;
  let fixture: ComponentFixture<HotelDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelDetalisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
