import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibratComponent } from './librat.component';

describe('LibratComponent', () => {
  let component: LibratComponent;
  let fixture: ComponentFixture<LibratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
