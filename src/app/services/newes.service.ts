import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NewesService {

  apiUrl = environment.apiUrl

  removeNull(FilterObject: any) {
    const newObject = { ...FilterObject };
    for (const key in newObject) {
      if (Object.prototype.hasOwnProperty.call(newObject, key)) {
        const element = newObject[key];
        if (element === null || element === undefined || element === "null" || element === "" || element === "0") {
          delete newObject[key]
        }
      }
    }
    return newObject;
  }

  constructor(
    private http: HttpClient
  ) { }

  filter = signal<{ title?: string; categoryId?: number | null }>({ title: '', categoryId: null });

  setTitle(title: string) {
    this.filter.update(f => ({ ...f, title }));
  }

  setCategoryId(categoryId: number | null) {
    this.filter.update(f => ({ ...f, categoryId }));
  }

  reset() {
    this.filter.set({ title: '', categoryId: null });
  }

  getNewes(filterObject: any) {
    let params = new HttpParams
    params = this.removeNull(filterObject);
    return this.http.get(`${this.apiUrl}/api/News`, { params })
  }

  getNewesById(id: number) {
    return this.http.get(`${this.apiUrl}/api/News/${id}`)
  }

  getLatestNewes() {
    return this.http.get(`${this.apiUrl}/api/News/latest`)
  }

  getNewesCategory() {
    return this.http.get(`${this.apiUrl}/api/NewsCategory`)
  }

}
