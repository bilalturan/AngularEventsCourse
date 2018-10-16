import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../shared/event.service';
import { Event } from '../models/event';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, OnDestroy {

  // private storeSubscription;

  showOnlineUrl: boolean;

  newEvent: Event;
  isDirt = true;
  constructor(private router: Router, private eventService: EventService,
    private store: Store<any>) { }

  ngOnInit() {
    this.store.pipe(select('app')).subscribe(data => {
      if (data) {
        this.showOnlineUrl = data.showOnlineUrl;
      } else {
        this.showOnlineUrl = true;
      }
    });
  }

  ngOnDestroy(): void {
    // TODO: Unsubscribe
    // this.storeSubscription.unsubscribe();
  }

  saveEvent(formValue) {
    this.eventService.saveEvent(formValue).subscribe( () => {
      this.isDirt = false;
      this.router.navigate(['/events']);
    });
  }

  cancel() {
    this.router.navigate(['/events']);
  }

  toggleShowOnlineUrl(value) {
    const action = {
      type: 'TOGGLE_SHOW_ONLINE_URL',
      payload: !value
    };
    this.store.dispatch(action);
  }
}
