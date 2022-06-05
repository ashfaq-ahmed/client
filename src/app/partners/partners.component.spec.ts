import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Office } from '../shared/interfaces/office';
import partners from '../../assets/json/offices.json'

import { PartnersComponent } from './partners.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ReactiveFormsModule } from '@angular/forms';
import { PartnersService } from '../shared/services/partners/partners.service';

describe('PartnersComponent', () => {
  let component: PartnersComponent;
  let fixture: ComponentFixture<PartnersComponent>;
  let offices: Array<Office>; 
  let listOfficesSpy: any;
  beforeEach(async () => {
    offices = partners;

    // Create a fake TwainService object with a `getQuote()` spy
    const partnersService = jasmine.createSpyObj('PartnersService', ['list']);
    listOfficesSpy = partnersService.list.and.returnValue(of(offices));

    await TestBed.configureTestingModule({
      declarations: [ PartnersComponent],
      imports: [LeafletModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [{provide: PartnersService, useValue: partnersService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Should use the service to get offices`, () => {
    expect(component.partners.length).toEqual(partners.length)
    expect(listOfficesSpy.calls.any()).withContext('list function called')
    .toBe(true);
  })
  
  it(`Should render the offices correctly`, () => {
    expect(fixture.nativeElement.querySelector('app-office-card')).not.toBeNull()
  })

});
