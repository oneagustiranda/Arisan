import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { mainUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<Object>{
    return this.http.get(mainUrl + '/api/users');
  }

  getAllUsersWithGroup(groupId): Observable<Object>{
    return this.http.get(mainUrl + '/api/users/group/' + groupId );
  }

  createUser(user): Observable<Object>{
    return this.http.post(
      mainUrl + '/api/users/',
      user);
  }
}
