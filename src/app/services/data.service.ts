import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  uploadData(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(`${environment.apiUrl}/file`, data, {
      headers: headers
    })
  }
}
