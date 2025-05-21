import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterModalComponent } from './components/connect/register-modal/register-modal.component';
import { LoginModalComponent } from './components/connect/login-modal/login-modal.component';
import { EditCandidateComponent } from './components/candidate/edit-candidate/edit-candidate.component';
import { CandidatesComponent } from './components/candidate/candidates/candidates.component';
import { authGuard } from './auth.guard';
import { VideoCallComponent } from './components/video-call/video-call.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent, children:[{path:'about', component:AboutComponent}] },
    { path: 'login', component: LoginModalComponent },
    { path: 'register', component: RegisterModalComponent },
    { path: 'candidates', component: CandidatesComponent, canActivate: [authGuard] },
    {path: 'update', component: EditCandidateComponent, canActivate: [authGuard] },
    {path: 'interview', component: VideoCallComponent },
    {path: 'video-call/:id', component: VideoCallComponent },

];

