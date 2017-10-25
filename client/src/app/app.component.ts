import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavigationEnd, Router } from '@angular/router';

class UserService {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('wrapper') wrapper: ElementRef;

  classMap = {
    'landing': 'landing-page',
    'register': 'signup-page',
    'login': 'login-page',
    'manage-users': 'profile-page'
  };

  constructor(private router: Router, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        for (let i = 0; i < event.url.split('/').length; i++) {
          let url = event.url.split('/')[i];

          if (this.classMap.hasOwnProperty(url)) {
            this.renderer.addClass(this.wrapper.nativeElement, this.classMap[url]);
          }
        }
      }
    });
  }
}
