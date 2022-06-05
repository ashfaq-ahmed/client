import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Office } from '../../interfaces/office';

import { OfficeCardComponent } from './office-card.component';

describe('OfficeCardComponent', () => {
  let component: OfficeCardComponent;
  let fixture: ComponentFixture<OfficeCardComponent>;
  let office: Office;

  beforeEach(async () => {
    office = { "id": 13, 
    "urlName": "gallus-consulting", 
    "organization": "Gallus Consulting", 
    "willWorkRemotely": true, 
    "website": "http://www.gallusconsulting.com/", 
    "services": "We're strategy consultants with a difference - we work with organisations and their leaders to take them from strategy to reality. In our work with leaders we often use 360-degree feedback to identify capability gaps, improve self-awareness, and develop strategic and cultural alignment. Our aim is for believe-able leaders to emerge with the drive, capability and cultural fit to take strategy to reality.", 
    "offices": { 
      "location": "London", 
      "address": "No1 Royal Exchange, London, EC3V 3DG",
       "coordinates": { 
         "lat": 51.5136102, "lon": -0.08757919999993646 
        } 
      }, 
      "distance": 3.8065685872130155 
    }
    await TestBed.configureTestingModule({
      declarations: [OfficeCardComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeCardComponent);
    component = fixture.componentInstance;
    component.office = office;
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the org name displayed`, () => {
    expect(fixture.nativeElement.querySelector('.name').textContent).toEqual(office.organization)
  })
});
