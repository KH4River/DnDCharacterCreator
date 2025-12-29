import { TestBed } from '@angular/core/testing';

import { LocalDatabase } from './local-database';

describe('LocalDatabase', () => {
  let service: LocalDatabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
