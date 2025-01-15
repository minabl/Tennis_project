import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { DashLayoutComponent } from './Admin/dash-layout/dash-layout.component';
import { UsersComponent } from './Admin/users/users.component';
import { authGuard } from './Gards/auth.guard';
import { autrGuard } from './Gards/autr.guard';
import { HomeComponent } from './Joueur/home/home.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { ReservationCalendarComponent } from './reservation-calendar/reservation-calendar.component';
import { TerrainsComponent } from './Joueur/terrains/terrains.component';
import { ReservationComponent } from './Admin/reservation/reservation.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  { path:'login',component:LoginComponent },
  {path:'register',component:RegisterComponent},

  {path:'privee',component:DashLayoutComponent, canActivate:[authGuard],
    children: [
        {path:'dashbord',component:UsersComponent ,canActivate:[autrGuard]},
        {path:'reservations',component:ReservationComponent,canActivate:[autrGuard]},
        {path:'terrains',component:TerrainsComponent},
        {path:'reservation/:id',component:ReservationCalendarComponent},
        {path :'notAuthorized' , component :NotAuthorizedComponent }

    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
