import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { mainUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getAllGroup(): Observable<Object>{
    return this.http.get(mainUrl + '/api/groups');
  }

  createGroup(group): Observable<Object>{
    return this.http.post(
      mainUrl + '/api/groups/',
      group);
  }
  deleteGroup(id): Observable<Object>{
    return this.http.delete(
      mainUrl + '/api/groups/' + id)
  }
  getGroup(id): Observable<Object>{
    return this.http.get(mainUrl + '/api/groups/' + id);
  }
}
