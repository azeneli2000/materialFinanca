import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XchnageComponent } from './xchnage.component';

describe('XchnageComponent', () => {
  let component: XchnageComponent;
  let fixture: ComponentFixture<XchnageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XchnageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XchnageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
