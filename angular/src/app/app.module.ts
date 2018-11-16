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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TimetableComponent,
    FooterComponent,
    LocationComponent,
    SettingsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
  ],
  providers: [AppstateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
