import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { AppServiceService } from 'src/app/services/app/app-service.service';

@Component({
  selector: 'app-shortest-path',
  templateUrl: './shortest-path.component.html',
  styleUrls: ['./shortest-path.component.css']
})
export class ShortestPathComponent implements OnInit {
  depX: number = 0
  depY: number = 0
  depZ: number = 0

  arrX: number = 0
  arrY: number = 0
  arrZ: number = 0

  constructor(private _router: Router, private rservice: RegistrationService, public aserv: AppServiceService) { }

  ngOnInit(): void {
    if(this.rservice.loggedIn === "") this._router.navigate(['login'])
  }


  /**
   * lance une requête vers le serveur afin qu'il calcule le plus court chemin entre dep et arr dans le graphe
   */
  verticesTestClick(){
  this.aserv.getVertices([this.depX, this.depY, this.depZ], [this.arrX, this.arrY, this.arrZ]).subscribe((response) => {
    
    console.log("Reponse du serveur ", response)
  })
  }

  onClickBack(){
    this._router.navigate(['errorManagement'])
  }
  

}
