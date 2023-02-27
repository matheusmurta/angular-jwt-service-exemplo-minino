import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IContract } from '../models/IContract';
import { ApiResponse } from '../models/IResponse';

@Injectable({
  providedIn: 'root'
})
export class ContractDetailsService {

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<IContract[]> {
    return this.http
      .get<ApiResponse<IContract[]>>(`http://localhost:3000/api/protegida`)
      .pipe(map(response => response.data));
  }

  getAllPublicApi(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/publica`)
    .pipe(map(data => data));
  }
}
