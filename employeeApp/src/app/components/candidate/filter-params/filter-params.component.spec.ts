import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterParamsComponent } from './filter-params.component';

describe('FilterParamsComponent', () => {
  let component: FilterParamsComponent;
  let fixture: ComponentFixture<FilterParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterParamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
