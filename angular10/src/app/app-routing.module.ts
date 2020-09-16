import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeparturesComponent } from './components/departures/departures.component';
import { LocationComponent } from './components/location/location.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
    { path: '', redirectTo: '/location', pathMatch: 'full'},
    { path: 'departures', component: DeparturesComponent },
    { path: 'location', component: LocationComponent },
    { path: 'settings', component: SettingsComponent},
    { path: 'about', component: AboutComponent},
    { path: '**', redirectTo: '/location'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
