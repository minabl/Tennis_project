import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { UsersComponent } from './Admin/users/users.component';
import { DashLayoutComponent } from './Admin/dash-layout/dash-layout.component';
import { HomeComponent } from './Joueur/home/home.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { ReservationCalendarComponent } from './reservation-calendar/reservation-calendar.component';
import { TerrainsComponent } from './Joueur/terrains/terrains.component';
import { CarTerrainComponent } from './Joueur/car-terrain/car-terrain.component';
import { ReservationComponent } from './Admin/reservation/reservation.component';
import {FooterComponent  } from "./shares/footer/footer.component";
import { NavBarComponent } from './shares/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    DashLayoutComponent,
    HomeComponent,
    NotAuthorizedComponent,
    ReservationCalendarComponent,
    TerrainsComponent,
    CarTerrainComponent,
    ReservationComponent,
    FooterComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
