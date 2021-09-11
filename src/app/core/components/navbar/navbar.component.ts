import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidenavEvent: EventEmitter<any> = new EventEmitter();
  fullscreenIcon : string = "fullscreen"
  private elem! : HTMLElement;



  constructor(@Inject(DOCUMENT) private document: any,private loginService : LoginService ) { }

  ngOnInit(): void {
    this.elem = document.documentElement
 
  }

  toggleSideNav() : void{
    this.toggleSidenavEvent.emit()
  }

  openFullscreen() {
    this.fullscreenIcon = this.fullscreenIcon == "fullscreen"? "close_fullscreen":"fullscreen"
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    }
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
   }

  }
}
