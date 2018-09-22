import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    constructor() { }

    getCurrentUser() {
        return this.getItem('currentUser');
    }

    setCurrentUser(object) {
       return this.setItem('currentUser', object);
    }

    removeCurrentUser() {
        return this.removeItem('currentUser');
    }

    private removeItem(key: string) {
        return localStorage.removeItem(key);
    }

    private getItem(key: string) {
       return JSON.parse(localStorage.getItem(key));
    }

    private setItem(key: string, object: any) {
        return localStorage.setItem(key, JSON.stringify(object));
    }
}
