import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidesearcherComponent } from './sidesearcher.component';

describe('SidesearcherComponent', () => {
  let component: SidesearcherComponent;
  let fixture: ComponentFixture<SidesearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidesearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidesearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
