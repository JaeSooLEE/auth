import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../../services/registration/registration.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any = ''
  password: any = ''
  errorMessage: any = ""

  constructor(public service: RegistrationService) { }

  ngOnInit(): void {
  }

  /**
   * Contacte le serveur pour vérifier les logs, puis le cas échéant se  connecte au compte.
   */
  onLoginClick() {
    this.service.validateLogin(this.username, this.password)
  }

  /**
   * Contacte le serveur afin qu'il envoie un mail de réinitialisation de mdp à l'utilisateur.
   */
  onForgetClick(){
    if(!this.service.checkMailFormat(this.username)){
      this.service.errorLoginMessage = "Invalid mail address"
      return
    }
    this.errorMessage = this.service.validateForgot(this.username)
  }

}
