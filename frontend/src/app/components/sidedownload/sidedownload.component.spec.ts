import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidedownloadComponent } from './sidedownload.component';

describe('SidedownloadComponent', () => {
  let component: SidedownloadComponent;
  let fixture: ComponentFixture<SidedownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidedownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidedownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
