import { UserService } from './../../Services/User/user.service';
import { Component, OnInit } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { StatsService } from '../../Services/Status/stats.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  currentRoute: string | undefined;
  constructor (public state:StatsService,
     private router:Router,
     private UserService:UserService
    ){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
      }
  });
  }
  

   
  ngOnInit(): void{
  
  }

  logout() {
    this.UserService.logout();
  }
}
