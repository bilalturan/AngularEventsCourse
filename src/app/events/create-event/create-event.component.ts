import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../shared/event.service';
import { Event } from '../models/event';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../state/app.reducer';
import { State } from '../../state/app.state';
import * as appActions from '../../state/app.actions';
import { takeWhile } from 'rxjs/operators';


@Component({
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, OnDestroy {

  private componentActive = true;

  showOnlineUrl: boolean;

  newEvent: Event;
  isDirt = true;
  constructor(private router: Router, private eventService: EventService,
    private store: Store<State>) { }

  ngOnInit() {
    this.store.pipe(
      select(fromRoot.getShowOnlineUrl),
      takeWhile(() => this.componentActive)
    )
    .subscribe(showOnlineUrl => {
      this.showOnlineUrl = showOnlineUrl;
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
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

  toggleShowOnlineUrl(value: boolean) {
    const payload: boolean = !value;
    this.store.dispatch(new appActions.ToggleShowOnlineUrl(payload));
  }
}
