import { Injectable } from '@angular/core';
import { AppServiceService } from '../app/app-service.service';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration/registration.service';




@Injectable({
  providedIn: 'root'
})
export class LogServiceService {
  errorTraces: any = ""
  constructor(private service: AppServiceService, private _router: Router, private rservice: RegistrationService) { }

  /**
   * récupère la date et l'heure courantes
   */

   getDateTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
  }


  /**
   * Déclenche une erreur et l'envoie sous forme de json au serveur.
   * le paramètre par défaut est une liste contenant "name" et "date". On peut y ajouter le paramètre "stackTrace" si on souhaite l'envoyer au serveur.
   * Les erreurs envoyées au serveur contiennent une stack trace illisible (localisation des erreurs).
   * Fix probable: utilisation des source maps
   */
  onClickBase(errorParams : string[] = ["name", "date"]){
    window.onerror = function(errorMsg, url, lineNumber) {
      alert(errorMsg + "" +lineNumber);
    }
      if(this.rservice.loggedIn !== ""){
        try{
          function square(num:any) {
            if (typeof num !== 'number') {
              throw new TypeError(`Expected number but got: ${typeof num}`);
            }
          
            return num * num;
          }
          square('9')
        }catch (error :any){
          let errJson:any = {name: "...", message: "...", stackTrace: "...", date: "..."}
          // console.log(error.stack)
          // console.log(errorParams.includes("stackTrace"))
          console.log(errorParams)
          if(errorParams.includes("name")) errJson["name"] = error.name

          if(errorParams.includes("message")) errJson["message"] = error.message

          if(errorParams.includes("stackTrace")) errJson["stackTrace"] = error.stack
          
          if(errorParams.includes("date")) errJson["date"] = this.getDateTime()
          
          this.service.postError("getErrors", errJson).subscribe(() => {
          console.log("Error sent ", errJson)
          })
        }
      }else{
        alert("You must be logged in")
        this._router.navigate(['login'])
      }
  }

/***
 * Permet de récupérer les erreur stockées dans le log du serveur et de les afficher sur la console.
 */

  onClickDisplay(){
      if(this.rservice.loggedIn !== ""){
        this.service.getError().subscribe((response) => {
          this.errorTraces = response;
          console.log("Reponse du serveur ", response)
        })
      }else{
        alert("invalid token")
      }
  }

  /**
   * Permet de nettoyer le log des erreurs du serveur.
   */

  onClickClear(){
      if(this.rservice.loggedIn !== ""){
        this.service.clearError().subscribe()
      }else{
        alert("invalid token")
      }

  }

}
