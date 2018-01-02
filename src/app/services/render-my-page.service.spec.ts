import { TestBed, inject } from '@angular/core/testing';

import { RenderMyPageService } from './render-my-page.service';

describe('RenderMyPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenderMyPageService]
    });
  });

  it('should be created', inject([RenderMyPageService], (service: RenderMyPageService) => {
    expect(service).toBeTruthy();
  }));
});
