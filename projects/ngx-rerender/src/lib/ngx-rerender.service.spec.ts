import { TestBed } from '@angular/core/testing';

import { NgxRerenderService } from './ngx-rerender.directive';

describe('NgxRerenderService', () => {
  let service: NgxRerenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRerenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
