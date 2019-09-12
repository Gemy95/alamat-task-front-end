import { TestBed } from '@angular/core/testing';

import { RegisterLoginService } from './register-login.service';

describe('RegisterLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterLoginService = TestBed.get(RegisterLoginService);
    expect(service).toBeTruthy();
  });
});
