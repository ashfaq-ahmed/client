import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { PartnersService } from './partners.service';

describe('PartnersService', () => {
  let service: PartnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [PartnersService], imports: [HttpClientTestingModule]});
    service = TestBed.inject(PartnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('list() should be observable', () => {
    expect(service.list({lat:123, lon:123,distance:1})).toBeInstanceOf(Observable)
  })


});
