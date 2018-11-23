import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { AppstateService } from './services/appstate.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocationComponent } from './components/location/location.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';

import { RouterModule, Routes } from '@angular/router';
import { CommonSpinnerComponent } from './components/common/spinner/spinner.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: '', redirectTo: '/location', pathMatch: 'full'},
  { path: 'timetable/:stopId', component: TimetableComponent },
  { path: 'timetable',  redirectTo: '/location', pathMatch: 'full'},
  { path: 'location/:lat/:lon', component: LocationComponent },
  { path: 'settings', component: SettingsComponent},
  { path: 'about', component: AboutComponent},
  { path: '**', component: LocationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TimetableComponent,
    FooterComponent,
    LocationComponent,
    SettingsComponent,
    AboutComponent,
    CommonSpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    RouterModule.forRoot(
      appRoutes
    ),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [AppstateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
