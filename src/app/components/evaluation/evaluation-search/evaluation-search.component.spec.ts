import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationSearchComponent } from './evaluation-search.component';

describe('EvaluationSearchComponent', () => {
  let component: EvaluationSearchComponent;
  let fixture: ComponentFixture<EvaluationSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationSearchComponent]
    });
    fixture = TestBed.createComponent(EvaluationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
