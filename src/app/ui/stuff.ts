import { Component } from '@angular/core';
import { AuthService } from '../services';

@Component({
	selector: 'real-stuff',
	template: `
		<div [routerLink]="['']">Auth</div>
		<div>BIGLY THINGS</div>
		<button (click)="signout()">SIGN OUT</button>
	`,
	styles: ['']
})

export class BiglyStuff {
	constructor(private auth: AuthService) {} 

	signout() {
		this.auth.signOut();
	}
};