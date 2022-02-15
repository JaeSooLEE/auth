import { Injectable } from '@angular/core';
import { AppServiceService } from '../app/app-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  loggedIn: string = "";
  errorLoginMessage: any = "";
  domainMail: string = "@pactenovation.fr"
  errorRegMessage:any = "";
  constructor(private service: AppServiceService, private _router: Router) { }


  /**
   * Vérifie que le password et le repeat password sont identiques
   */
  passwordCheck(p:any, p2:any){
    if(p != p2) return false
    return true
  }


  /**
   * Vérifie que les données sont cohérentes puis envoie une requête au serveur pour qu'il crée un nouceau compte utilisateur.
   * En cas de succès, redirection vers la page errorManagement.
   * Sinon, affichage de l'erreur.
   */
  validateReg(id: string, p: any, p2: any, tok: any){
    if(this.passwordCheck(p, p2) == false){
      this.errorRegMessage = "Password mismatch"
      return
    }
    this.service.addUser(id, p, tok).subscribe((response) => {
      this.loggedIn = id
      if(response == ""){
      this.errorRegMessage = ""
      this._router.navigate(['errorManagement'])
      }else{
        console.log(response)
        this.errorRegMessage = response
      }
    })
  }

  /**
   * Envoie une requête qu serveur pour qu'il valide la connection à un compte utilisateur.
   * Si la connection est validée, redirige vers la page errorManagement.
   * Sinon, affiche l'erreur.
   */
  validateLogin(username: any, password: any){
    let res = ""
    this.service.checkLogin(username, password).subscribe((response) => {
      if(response === "true"){
        console.log(response)
        this._router.navigate(['errorManagement'])
        this.loggedIn = username
        this.errorLoginMessage = ""
      }else{
        if(response === "blocked"){
          this.errorLoginMessage = "Too many fails, please try again later"
        }else{
          console.log(response)
          this._router.navigate(['login'])
          this.errorLoginMessage = "Wrong mail and/or password"
        }
      }
    })
  }


  /**
   * Envoie une requête au serveur pour qu'il envoie un mail de réinitialisation de mdp à l'utilisateur.
   */
  validateForgot(username:any){
    this.service.sendmail(username).subscribe((response) => {
      if(response === "true"){
        alert("Password reset mail sent to your mailbox")
        this.errorLoginMessage = "reset sent"
      }else{
        alert("wrong mail")
        this.errorLoginMessage = "wrong mail"  
      }
    })
  }

  /**
   * Vérifie que le format de l'adresse mail est valide.
   */
  checkMailFormat(mail: any){
    let regex = new RegExp('[a-z0-9]' + this.domainMail);
    return regex.test(mail)
  }


  /**
   * Change le statut de connection à déconnecté puis redirige vers la page login.
   */
  logOutRedirect(){
    this.loggedIn = "";
    this._router.navigate(['login']);
  }

}
