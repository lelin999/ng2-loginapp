import { RouterModule } from  '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import { Auth, BiglyStuff } from './UI';
import { AuthService } from './services'

export const routes: ModuleWithProviders = RouterModule.forRoot([
	{ path: '', canActivate: [AuthService], component: Auth },
	{ path: 'auth', component: BiglyStuff },
	{ path: '**', redirectTo: '' }

]);