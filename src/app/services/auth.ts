import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from './api';

@Injectable()

export class AuthService {

	JWT_KEY = 'login_key'

	constructor (
		private router: Router,
		private apiService: ApiService
	) {
		const token = window.localStorage.getItem['login_key']
		if (token) { this.setJwt(token) }
	}
	
	setJwt(jwt: String) {
		window.localStorage.setItem(this.JWT_KEY, jwt);
		this.apiService.setHeaders({Authorization: `Bearer ${jwt}`});
	}
	authenticate(path, credits): Observable<any> {
		return this.apiService.post(`/${path}`, credits)
			.do (res => {
				if (res.token !== null) { this.setJwt(res.token) }
			})
			.map(res => res.status);
	}	
	isAuthorized(): boolean {
    return Boolean(window.localStorage.getItem(this.JWT_KEY));
  }
  canActivate(): boolean {
    const canActivate = this.isAuthorized();
    this.onCanActivate(canActivate);
    return canActivate;
  }
	onCanActivate(canActivate: boolean) {
    if (!canActivate) {
      this.router.navigate(['auth']);
    }
  }
  signOut() {
  	window.localStorage.removeItem(this.JWT_KEY);
  	this.router.navigate(['auth']);
  }
}
