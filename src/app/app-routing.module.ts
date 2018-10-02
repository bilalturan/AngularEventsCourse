import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { E404Component } from './errors/e404.component';
import { EventsListResolverService } from './shared/events-list-resolver.service';
import {
  EventsListComponent,
  CreateEventComponent,
  EventDetailsComponent,
  EventRouteActivatorGuard,
  EventRouteDeactivatorGuard
} from './events/index';

export const appRoutes: Routes = [
  { path: 'events/new', component: CreateEventComponent,
    canDeactivate: [EventRouteDeactivatorGuard]  },
  { path: 'events', component: EventsListComponent,
    resolve: {'events': EventsListResolverService } },
  { path: 'events/:id', component: EventDetailsComponent,
    canActivate: [EventRouteActivatorGuard] },
  { path: '404', component: E404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'user', loadChildren: './user/user.module#UserModule' }
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
