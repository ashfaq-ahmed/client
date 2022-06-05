import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PartnersQuery } from '../../interfaces/partners-query';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(private http: HttpClient) { }

  list(params: PartnersQuery) {
    return this.http.get(`${environment.server}/partners`, {params: params as any})
  }
}
