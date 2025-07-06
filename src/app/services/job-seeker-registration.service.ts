import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerRegistrationService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  RegisterJobSeeker(JobSeeker: any) {
    return this.http.post(`${this.apiUrl}/api/JobSeekers/register`, JobSeeker)
  }


}
