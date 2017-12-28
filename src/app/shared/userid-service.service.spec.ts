import { TestBed, inject } from '@angular/core/testing';

import { UseridServiceService } from './userid-service.service';

describe('UseridServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UseridServiceService]
    });
  });

  it('should be created', inject([UseridServiceService], (service: UseridServiceService) => {
    expect(service).toBeTruthy();
  }));
});
