import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';


const userRoutes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes), // In main module .forRoot was used...
    StoreModule.forFeature('user', {})
  ],
  declarations: [ProfileComponent, LoginComponent]
})
export class UserModule { }
