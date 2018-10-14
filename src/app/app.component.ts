import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sidebarExpanded: boolean = true;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.checkAuthenticationStatus();
  }

  sidenMenuToggle(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
  }
}
