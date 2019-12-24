import { TestBed } from '@angular/core/testing';

import { PlaybackserviceService } from './playbackservice.service';

describe('PlaybackserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaybackserviceService = TestBed.get(PlaybackserviceService);
    expect(service).toBeTruthy();
  });
});
