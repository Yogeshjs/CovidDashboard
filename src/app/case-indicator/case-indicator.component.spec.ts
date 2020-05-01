import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseIndicatorComponent } from './case-indicator.component';

describe('CaseIndicatorComponent', () => {
  let component: CaseIndicatorComponent;
  let fixture: ComponentFixture<CaseIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
