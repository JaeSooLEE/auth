import { Component, OnInit } from '@angular/core';
import { LogServiceService } from '../../services/log/log-service.service';
import { RegistrationService } from '../../services/registration/registration.service';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app/app-service.service';




@Component({
  selector: 'app-base-button',
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.css']
})
export class BaseButtonComponent implements OnInit {

  constructor(public service: LogServiceService, public rservice: RegistrationService, public aserv: AppServiceService,private _router: Router) { }

  ngOnInit(): void {
    window.onerror = function(errorMsg, url, lineNumber) {
      alert(errorMsg + "" + lineNumber);
      // alert("This is a stack trace! Wow! --> %s", error.stack);
      return true
    }
    if(this.rservice.loggedIn === "") {this._router.navigate(['login'])}
  }

  /**
   * récupère la date et l'heure courantes
   */

  getDateTime(){
    this.service.getDateTime()
  }


  /**
   * Déclenche une erreur et l'envoie sous forme de json au serveur.
   * le paramètre par défaut est une liste contenant "name" et "date". On peut y ajouter le paramètre "stackTrace" si on souhaite l'envoyer au serveur.
   * Les erreurs envoyées au serveur contiennent une stack trace illisible (localisation des erreurs).
   * Fix probable: utilisation des source maps
   */
  onClickBase(errorParams : string[] = []){
    this.service.onClickBase(errorParams)
  }

/***
 * Permet de récupérer les erreur stockés dans le log du serveur et de les afficher sur la console.
 */

  onClickDisplay(){
    this.service.onClickDisplay()
  }

  /**
   * Permet de nettoyer le log du serveur.
   */

  onClickClear(){
    this.service.onClickClear()

  }

  onClickShortestPath(){
    // console.log(this.rservice.loggedIn)
    this._router.navigate(['shortestPath'])
  }



  /**
   * Permet de se déconnecter et remettre à zéro l'affichage des erreurs
   */

  onSignOut(){
    this.service.errorTraces = "";
    this.rservice.logOutRedirect();
  }
  

}
