import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesuesiComponent } from './mesuesi.component';

describe('MesuesiComponent', () => {
  let component: MesuesiComponent;
  let fixture: ComponentFixture<MesuesiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesuesiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesuesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
