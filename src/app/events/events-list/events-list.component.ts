import { Component, OnInit, OnDestroy } from '@angular/core';
import {Event } from '../models/event';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../../state/app.state';
import * as appActions from '../../state/app.actions';
import * as fromRoot from '../../state/app.reducer';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy {
  // componentActive = true;

  myEvents$: Observable<Event[]>;
  errorMsg$: Observable<string>;

  constructor(// private eventService: EventService,
    private route: ActivatedRoute, private store: Store<State>) {}

  ngOnInit() {

    this.errorMsg$ = this.store.pipe(select(fromRoot.getError));

    this.store.dispatch(new appActions.Load());

    // This way angular subscribes/unsubscribes
    this.myEvents$ =  this.store.pipe(select(fromRoot.getEvents));

    // TODO: Do this (unsubscribe yourself) if you need the values in the component
    // this.store.pipe(
    //   select(fromRoot.getEvents),
    //   takeWhile(() => this.componentActive)
    // )
    // .subscribe(
    //   (events: Event[]) => this.myEvents = events
    // );

    //  this.eventService.getEvents().subscribe(data => {
    //    this.myEvents = data;
    //  });

    // this.myEvents = this.route.snapshot.data['events'];
  }

  ngOnDestroy(): void {
    // this.componentActive = false;
  }

}

