import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsmodalComponent } from './actionsmodal.component';

describe('ActionsmodalComponent', () => {
  let component: ActionsmodalComponent;
  let fixture: ComponentFixture<ActionsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
