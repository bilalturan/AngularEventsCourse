import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsListComponent } from './events/events-list/events-list.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { E404Component } from './errors/e404.component';
import { EventRouteActivatorGuard } from './events/event-details/event-route-activator.guard';
import { EventRouteDeactivatorGuard } from './events/create-event/event-route-deactivator.guard';
import { EventsListResolverService } from './shared/events-list-resolver.service';

export const appRoutes: Routes = [
  { path: 'events/new', component: CreateEventComponent,
    canDeactivate: [EventRouteDeactivatorGuard]  },
  { path: 'events', component: EventsListComponent,
    resolve: {'events': EventsListResolverService } },
  { path: 'events/:id', component: EventDetailsComponent,
    canActivate: [EventRouteActivatorGuard] },
  { path: '404', component: E404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
