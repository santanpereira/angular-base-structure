import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private storageService: StorageService) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.storageService.setCurrentUser(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.storageService.removeCurrentUser();
    }
}
