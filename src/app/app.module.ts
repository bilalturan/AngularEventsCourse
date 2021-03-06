import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TOASTR_TOKEN, IToastr } from './common/toastr.service';
import { JQ_TOKEN } from './common/jquery.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { E404Component } from './errors/e404.component';

import {
  EventsListComponent,
  EventThumbnailComponent,
  CreateEventComponent,
  EventDetailsComponent
} from './events/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { SessionListComponent } from './events/event-details/session-list.component';
import { CollapsibleWellComponent } from './common/collapsible-well/collapsible-well.component';
import { DurationPipe } from './shared/duration.pipe';
import { SimpleModalComponent } from './common/simple-modal/simple-modal.component';
import { ModalTriggerDirective } from './common/modal-trigger.directive';
import { UpvoteComponent } from './events/event-details/upvote/upvote.component';
import { LocationValidatorDirective } from './events/location-validator.directive';
import { reducer } from './state/app.reducer';
import { environment } from 'src/environments/environment.prod';
import { EffectsModule } from '@ngrx/effects';
import { EventsEffect } from './state/app.effects';
import { RequestInterceptor } from './shared/request.interceptor';
import { ResponseInterceptor } from './shared/response.interceptor';

const toastr: IToastr = window['toastr']; // to satisfy typescript compiler
const jQuery = window['$'];

@NgModule({
  // Component, pipes and directives to be used by this module
  declarations: [
    AppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavbarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    E404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidatorDirective
  ],
  // Imported modules' exported declarations and providers
  // are available to this module.
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StoreModule.forRoot( {app: reducer} ),
    StoreDevtoolsModule.instrument({
      name: 'APM Demo',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([EventsEffect])
  ],
  // Services are added as providers
  providers: [
    {
      provide: TOASTR_TOKEN, // using injection token for global objects
      useValue: toastr
    },
    {
      provide: JQ_TOKEN, // using injection token for global objects
      useValue: jQuery
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      // True for interceptors. Configures the Provide token as
      // an array of values to be injected by the dependency injection system
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


