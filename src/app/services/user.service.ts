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

  getAllUsersWithGroupAndUnpaid(groupId): Observable<Object>{
    return this.http.get(mainUrl + '/api/users/group/' + groupId + '/unpaid');
  }
  createUser(user): Observable<Object>{
    return this.http.post(mainUrl + '/api/users/', user);
  }
  UpdateToPaidUser(groupId, username): Observable<Object>{
    return this.http.put(mainUrl  + '/api/users/group/' + groupId + '/' + username, username);
  }
  deleteUserByGroup(id): Observable<Object>{
    return this.http.delete(mainUrl + '/api/users/group/' + id );
  }
}
