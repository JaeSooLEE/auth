import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../services/app/app-service.service';
import { FormBuilder } from '@angular/forms';


//var tokenOnDisplay 
//var iTok
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})



export class AuthComponent implements OnInit {
  inToken: string =  ''
  tokenOnDisplay: string = ''
  constructor(private service: AppServiceService) { }

  ngOnInit(): void {
  }

  clickMe() {
    this.service.checkToken(this.inToken).subscribe((response) => {
    if(response === "true"){
      alert("valid token successfully loaded")
      this.service.setCurrent(this.inToken)
    }else{
      alert("invalid token")
      this.service.setCurrent(this.inToken)
    }
  })
  }




  onClickGToken(){
    this.service.generateToken().subscribe((response) => this.tokenOnDisplay = response);
  }

  onClickCleanTokens(){
    this.service.cleanTokens().subscribe();
  }

}
