import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Session } from '../events/models/event';
import { EventService } from '../shared/event.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchTerm = '';
  foundSessions: Session[];

  constructor(public authService: AuthService, private eventService: EventService) { }

  ngOnInit() {
  }

  searchSessions(searchTerm: string) {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
      console.log(this.foundSessions);
    });
  }
}
