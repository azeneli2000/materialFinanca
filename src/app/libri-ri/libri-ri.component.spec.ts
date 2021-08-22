import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibriRiComponent } from './libri-ri.component';

describe('LibriRiComponent', () => {
  let component: LibriRiComponent;
  let fixture: ComponentFixture<LibriRiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibriRiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibriRiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
