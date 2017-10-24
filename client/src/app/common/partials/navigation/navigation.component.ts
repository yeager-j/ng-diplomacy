import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild('navigation') navbar: ElementRef;
  public static updateLinks: Subject<boolean> = new Subject();
  private jwtHelper: JwtHelper = new JwtHelper();

  transparentPages = [
    '/admin/manage-users/:',
    '/admin/manage-users/:/edit',
    '/login',
    '/home'
  ];
  url;

  constructor(private renderer: Renderer2, private router: Router, private route: ActivatedRoute) {

    this.router.events.subscribe(event => {
      this.renderer.removeClass(this.navbar.nativeElement, 'navbar-transparent');
      if (event instanceof NavigationEnd) {
        for (let i = 0; i < this.transparentPages.length; i++) {
          let page = this.transparentPages[i];

          if (this.doesMatchRoute(page, event.url)) {
            this.renderer.addClass(this.navbar.nativeElement, 'navbar-transparent');
          }

          this.renderer.listen('window', 'scroll', (e) => {
            if (!this.doesMatchRoute(page, event.url)) {
              return;
            }

            const number = window.scrollY;
            if (number > 150 || window.pageYOffset > 150) {
              this.renderer.removeClass(this.navbar.nativeElement, 'navbar-transparent');
            } else {
              this.renderer.addClass(this.navbar.nativeElement, 'navbar-transparent');
            }
          });
        }
      }
    });
  }

  doesMatchRoute(route, check) {
    let routeArr = route.split('/').slice(1);
    let checkArr = check.split('/').slice(1);

    if (routeArr.length !== checkArr.length) {
      return false;
    }

    for (let i = 0; i < routeArr.length; i++) {
      if (routeArr[i].includes(':')) {
        continue;
      }

      if (routeArr[i] !== checkArr[i]) {
        return false;
      }
    }

    return true;
  }

  ngOnInit() { }
}
