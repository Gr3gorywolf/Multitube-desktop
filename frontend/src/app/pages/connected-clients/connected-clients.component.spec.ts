import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedClientsComponent } from './connected-clients.component';

describe('ConnectedClientsComponent', () => {
  let component: ConnectedClientsComponent;
  let fixture: ComponentFixture<ConnectedClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
