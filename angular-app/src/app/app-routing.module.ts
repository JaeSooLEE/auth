import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BaseButtonComponent} from './components/base-button/base-button.component'
import {AuthComponent} from './components/auth/auth.component'
import {LoginComponent} from './components/login/login.component'
import {RegistrationComponent} from './components/registration/registration.component'
import { ShortestPathComponent } from './components/shortest-path/shortest-path.component';

const routes: Routes = [
 // { path: '', component: AuthComponent},
  { path: 'errorManagement', component: BaseButtonComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register/:token', component: RegistrationComponent},
  { path: 'shortestPath', component: ShortestPathComponent},
  { path: '', component: BaseButtonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
