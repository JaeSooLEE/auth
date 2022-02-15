import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
//import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

interface Event {
  type : string;
  data : string;
}


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  readonly ROOT_URL:any;
  currentToken: any;
  //public appEvent = new EventEmitter<Event>();
  //loggedIn: boolean = false;
  constructor(private http: HttpClient) { 
  this.ROOT_URL = 'http://localhost:3000'
  }


  setCurrent(tok:any){
    this.currentToken = tok
  }

  /**
   * Factorisation des requêtes post sur le ROOT_URL
   */
  public sendReqPost(args: string, req: any, response: Object){
    return this.http.post(this.ROOT_URL +args, req, response)
   }

   /**
    * Factorisation des requêtes get sur le ROOT_URL
    */
   public sendReqGet(args: any, response: any){
     return this.http.get(this.ROOT_URL + args, response)
   }

   /**
    * Factorisation des requêtes delete sur le ROOT_URL
    */
   public sendReqDel(args:any){
     return this.http.delete(this.ROOT_URL + args)
   }

  postError(uri: string, payload: Object){
    return this.sendReqPost("/error/addErrors", payload, config)
  }

  getError(){
    return this.sendReqGet("/error/getErrors", {responseType: 'text'})
  }

  clearError(){
    return this.sendReqDel("/error/clearErrors")
  }

  generateToken(){
    return this.http.post(this.ROOT_URL +"/auth/addToken", "", {responseType: 'text'})
    //return this.sendReqPost("/auth/addToken", "", {responseType: 'text'})
  }

  checkToken(vTok:any){
    return this.sendReqPost("/auth/checkToken", {"token": vTok}, {responseType: 'text'})
  }

  cleanTokens(){
    return this.sendReqDel("/auth/cleanTokens")
  }

  checkLogin(uname: any, pw: any){
    return this.sendReqPost("/login/checkLogin", {"username": uname, "password": pw}, {responseType: 'text'})
  }

  sendmail(mail: any){
    return this.sendReqPost("/login/sendmail", {"mail": mail}, {responseType: 'text'})
  }

  addUser(uname: any, pw: any, tok: any){
    return this.sendReqPost("/login/addUser", {"username": uname, "password": pw, "tok": tok}, {responseType: 'text'})
  }


  getVertices(dep: any, arr: any){
    return this.sendReqPost("/mantes/getVertices", {"departure": dep, "destination": arr}, {responseType: 'json'})
  }
  


}

