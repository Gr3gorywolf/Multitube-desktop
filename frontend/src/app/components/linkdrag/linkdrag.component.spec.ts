import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkdragComponent } from './linkdrag.component';

describe('LinkdragComponent', () => {
  let component: LinkdragComponent;
  let fixture: ComponentFixture<LinkdragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkdragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkdragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
