import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterModalComponent } from './components/connect/register-modal/register-modal.component';
import { LoginModalComponent } from './components/connect/login-modal/login-modal.component';
import { FilterParamsComponent } from './components/candidate/filter-params/filter-params.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginModalComponent },
    { path: 'register', component: RegisterModalComponent },
    { path: 'candidates', component: FilterParamsComponent },
];

