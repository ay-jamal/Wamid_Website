import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  getJobs() {
    return this.http.get(`${this.apiUrl}/api/Jobs`)
  }

  getJobById(id: number) {
    return this.http.get(`${this.apiUrl}/api/Jobs/${id}`)
  }

  addJobApplication(JobApplication: any) {
    return this.http.post(`${this.apiUrl}/api/JobApplications`, JobApplication)
  }

}
