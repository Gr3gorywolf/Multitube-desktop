import { TestBed } from '@angular/core/testing';

import { TcpService } from './tcp.service';

describe('TcpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcpService = TestBed.get(TcpService);
    expect(service).toBeTruthy();
  });
});
