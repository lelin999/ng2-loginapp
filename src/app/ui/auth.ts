import { Component } from '@angular/core';

@Component({
	selector: 'auth',
	template: `
		<div [routerLink]="['auth']">Actual Stuff</div>
		<h3>{{mode}}</h3>
		<div>
			<form>
				<input
					type="email"
				>
				<input
					type="password"
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
	mode = 'sign-in';
	modeText = 'Don\'t have an account?';

	modeChange() {
		if (this.mode === 'sign-in') {
			this.mode = 'sign-out';
			this.modeText = 'Already have an account?';
		} else {
			this.mode = 'sign-in';
			this.modeText = 'Don\'t have an account?';
		}
	}
};