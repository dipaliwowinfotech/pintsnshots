import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShishaLoungeComponent } from './shisha-lounge.component';

describe('ShishaLoungeComponent', () => {
  let component: ShishaLoungeComponent;
  let fixture: ComponentFixture<ShishaLoungeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShishaLoungeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShishaLoungeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
