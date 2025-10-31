import { TestBed } from '@angular/core/testing';

import { AddCoachService } from './add-coach.service';

describe('AddCoachService', () => {
  let service: AddCoachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCoachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
