import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatlayoutComponent } from './chatlayout/chatlayout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {path: 'signup', component: SignupComponent, canActivate: [LoginGuard]},
  {path: 'chat', component: ChatlayoutComponent , canActivate: [AuthGuard]},
  {path: '', redirectTo: 'chat', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
