import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterModalComponent } from './components/connect/register-modal/register-modal.component';
import { LoginModalComponent } from './components/connect/login-modal/login-modal.component';
import { EditCandidateComponent } from './components/candidate/edit-candidate/edit-candidate.component';
import { CandidatesComponent } from './components/candidate/candidates/candidates.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginModalComponent },
    { path: 'register', component: RegisterModalComponent },
    { path: 'candidates', component: CandidatesComponent, canActivate: [authGuard] },
    {path: 'update', component: EditCandidateComponent, canActivate: [authGuard] },
];

