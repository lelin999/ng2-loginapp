import { Component } from '@angular/core';
import { AuthService } from '../services';

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
		</div>
	`,
	styles: ['']
})

export class Auth {
	user = {
		email: "",
		password: ""
	}
	modePath = 'signin';
	mode = 'sign-in';
	modeText = 'Don\'t have an account?';

	constructor(private auth: AuthService) {};

	modeChange() {
		if (this.mode === 'sign-in') {
			this.modePath = 'signout';
			this.mode = 'sign-out';
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
			.subscribe( data => console.log(data) );
	}
};