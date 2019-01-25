import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimetableComponent } from './components/timetable/timetable.component';
import { LocationComponent } from './components/location/location.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/location', pathMatch: 'full'},
    { path: 'departures/:stopId', component: TimetableComponent },
    { path: 'departures',  redirectTo: '/location', pathMatch: 'full'},
    { path: 'location/:lat/:lon', component: LocationComponent },
    { path: 'settings', component: SettingsComponent},
    { path: 'about', component: AboutComponent},
    { path: '**', component: LocationComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
