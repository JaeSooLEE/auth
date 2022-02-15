import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../../services/registration/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newRegistration: boolean = false;
  username: any = ''
  password: any = ''
  rpassword: any = ''
  tokenFromRoute: any = '0'
  errorMessage:any = ""
  
  constructor(private route: ActivatedRoute, public rservice: RegistrationService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.tokenFromRoute = String(routeParams.get('token'));
    if (this.tokenFromRoute === "0") this.newRegistration = true
  }


  /**
   * Vérifie les informations entrées puis, si elles sont valides, les envoie au serveur afin qu'il crée un nouveau compte utilisateur.
   * Dans le cas où on réinitialise un mdp, on envoie les données au serveur qui va vérifier que le token et le mail d'utilisateur correspondent. 
   */
  onValidateClick(){
      if(!this.rservice.checkMailFormat(this.username)){
        this.rservice.errorRegMessage = "Invalid mail address"
        return
      }
      let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!this.password.match(passw)){
        this.rservice.errorRegMessage = "Your password must contain 6 to 20 characters including one numeric digit, one uppercase and one lowercase letter"
        return
      }
      //this.rservice.errorMessage = this.rservice.validateReg(this.username, this.password, this.rpassword, this.tokenFromRoute)
      this.rservice.validateReg(this.username, this.password, this.rpassword, this.tokenFromRoute)
  }  

}
