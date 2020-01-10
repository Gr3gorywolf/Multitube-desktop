import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationCardComponent } from './recommendation-card.component';

describe('RecommendationCardComponent', () => {
  let component: RecommendationCardComponent;
  let fixture: ComponentFixture<RecommendationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
