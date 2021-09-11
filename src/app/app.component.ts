import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { LoginService } from './core/services/login.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'biX';
  userLoggedIn : boolean = false
  subscription! : Subscription;
  private ngUnsubscribe = new Subject();


  constructor(private loginService : LoginService,private router : Router ){}

  ngOnInit(){
    
    this.subscription = this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.userLoggedIn = this.loginService.isLoggedIn()
        
      }
    })


    this.loginService.loginSubject.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data)=>{
      
      this.userLoggedIn = this.loginService.isLoggedIn()
      console.log(this.userLoggedIn)
    })

}
  
  ngOnDestroy(){
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

}