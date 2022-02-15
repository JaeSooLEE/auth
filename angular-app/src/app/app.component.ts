import { Component, OnInit } from '@angular/core';
//import { AppServiceService } from './services/app/app-service.service';
import { RegistrationService } from './services/registration/registration.service';
import { BaseButtonComponent } from './components/base-button/base-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-app';

  constructor(public service: RegistrationService, private _router: Router){
     
  }

  ngOnInit(){
    //this.service.getError()
  }

  

  registerRoute(){
    this._router.navigate(['register/0']);
  }

}
