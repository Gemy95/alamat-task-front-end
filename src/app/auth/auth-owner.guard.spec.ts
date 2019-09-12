import { TestBed, async, inject } from '@angular/core/testing';

import { AuthOwnerGuard } from './auth-owner.guard';

describe('AuthOwnerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthOwnerGuard]
    });
  });

  it('should ...', inject([AuthOwnerGuard], (guard: AuthOwnerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
