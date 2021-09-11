import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginSubject : Subject<any> = new Subject()

  constructor() { }

  login() : void{
    
    sessionStorage.setItem("token","abcdefg")


    this.loginSubject.next()
  }
  doLogout() : void{
    
    this.loginSubject.next()
  }

  isLoggedIn() : boolean {
    
    return sessionStorage.getItem("token") === null?false:true
  }


}
