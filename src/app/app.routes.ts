import {Routes} from '@angular/router';
import {HomeComponent} from './state/home/home.component';
import {LoginComponent} from './state/login/login.component';
import {SignUpComponent} from './state/sign-up/sign-up.component';
import {EmailVerificationComponent} from './state/email-verification/email-verification.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'mail-verification',
    component: EmailVerificationComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
];
