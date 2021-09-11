import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService , private route : Router) { }

  ngOnInit(): void {
    
    if(this.loginService.isLoggedIn()){
      this.route.navigate((["/fortune/dashboard"]))
    }

  }


  doLogin() : void{
    
    this.loginService.login()
  
  }

}
