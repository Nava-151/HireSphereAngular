import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessStoriesComponent } from './success-stories.component';

describe('SuccessStoriesComponent', () => {
  let component: SuccessStoriesComponent;
  let fixture: ComponentFixture<SuccessStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessStoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
