import { RouterModule } from  '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import { Auth, BiglyStuff } from './UI';


export const routes: ModuleWithProviders = RouterModule.forRoot([
	{ path: '', component: Auth },
	{ path: 'auth', component: BiglyStuff },
	{ path: '**', redirectTo: '' }
]);