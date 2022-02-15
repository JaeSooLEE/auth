import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BaseButtonComponent } from './components/base-button/base-button.component';
import { AuthComponent } from './components/auth/auth.component'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component'
import { RegistrationComponent} from './components/registration/registration.component';
import { ShortestPathComponent } from './components/shortest-path/shortest-path.component'



@NgModule({
  declarations: [
    AppComponent,
    BaseButtonComponent,
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    ShortestPathComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
