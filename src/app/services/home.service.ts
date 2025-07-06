import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getOrgProfile() {
    return this.http.get(`${this.apiUrl}/api/OrganizationProfile`)
  }

}
