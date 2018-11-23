import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: CommonSpinnerComponent;
  let fixture: ComponentFixture<CommonSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
