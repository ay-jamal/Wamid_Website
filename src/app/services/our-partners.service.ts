import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OurPartnersService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getOrgPartners() {
    return this.http.get(`${this.apiUrl}/api/OurPartners`)
  }

}
