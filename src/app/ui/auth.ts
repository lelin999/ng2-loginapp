import { Component } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';

@Component({
	selector: 'auth',
	template: `
		<div [routerLink]="['auth']">Actual Stuff</div>
		<h3>{{mode}}</h3>
		<div>
			<form (submit)="submit()">
				<input 
					[(ngModel)]="user.email"
					name="email"
					type="email" 
					placeholder="email"
				>
				<input
					[(ngModel)]="user.password"
					name="password"
					type="password"
					placeholder="password"
				>
				<button
					type="submit"
				>
					{{mode}}
				</button>
			</form>

			<div
				(click)="this.modeChange()" 
			>
				{{modeText}}
			</div>
			<div>
				{{errorMessage}}
			</div>
		</div>
	`,
	styles: ['']
})

export class Auth {
	user = {
		email: "",
		password: ""
	}
	errorMessage = "";
	modePath = 'signin';
	mode = 'sign-in';
	modeText = 'Don\'t have an account?';

	constructor(
		private auth: AuthService,
		private router: Router
		) {};

	modeChange() {
		if (this.mode === 'sign-in') {
			this.modePath = 'signup';
			this.mode = 'sign-up';
			this.modeText = 'Already have an account?';
		} else {
			this.modePath = 'signin';
			this.mode = 'sign-in';
			this.modeText = 'Don\'t have an account?';
		}
	}
	submit() {
		console.log(this.user);
		this.auth.authenticate(this.modePath, this.user)
			.subscribe( data => {
				if (data === 'USERORPWNOTFOUND') {
					this.errorMessage = "Email or password incorrect."
				} else if (data === 'USEREXISTS') {
					this.errorMessage = "User already exists."
				} else {
					this.router.navigate(['']);
				}
			});
	}
};