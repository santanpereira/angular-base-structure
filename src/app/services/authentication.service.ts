import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable()
export class AuthenticationService {
    private loggedIn = new BehaviorSubject<boolean>(false); // {1}
    constructor(private http: HttpClient, private storageService: StorageService) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.storageService.setCurrentUser(user);
                }
                this.loggedIn.next(true);
                return user;
            }));
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    logout() {
        // remove user from local storage to log user out
        this.storageService.removeCurrentUser();
        this.loggedIn.next(false);
    }
}
