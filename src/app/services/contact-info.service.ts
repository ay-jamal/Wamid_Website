import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getContactInfo() {
    return this.http.get(`${this.apiUrl}/api/OrganizationProfile`).pipe(map((res: any) => {
      return {
        phone: res.phone,
        email: res.email,
        facebookLink: res.facebookLink,
        tikTokLink: res.tikTokLink,
        instagramLink: res.instagramLink,
        location: res.location
      }
    }))
  }

}
