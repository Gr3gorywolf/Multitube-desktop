import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteServerStatusComponent } from './remote-server-status.component';

describe('RemoteServerStatusComponent', () => {
  let component: RemoteServerStatusComponent;
  let fixture: ComponentFixture<RemoteServerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteServerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteServerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
