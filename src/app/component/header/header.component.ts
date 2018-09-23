import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isLoggedIn$: Observable<boolean>;

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit() {
        this.isLoggedIn$ = this.authenticationService.isLoggedIn;
    }

    onLogout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
