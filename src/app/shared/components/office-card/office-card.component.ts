import { Component, Input, OnInit } from '@angular/core';
import { Office } from '../../interfaces/office';

@Component({
  selector: 'app-office-card',
  templateUrl: './office-card.component.html',
  styleUrls: ['./office-card.component.scss']
})
export class OfficeCardComponent implements OnInit {
  @Input('office') office!: Office;
  constructor() { }

  ngOnInit(): void {
  }

}
