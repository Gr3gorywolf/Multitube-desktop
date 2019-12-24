import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { MaterializeModule } from "angular2-materialize";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DownloadmodalComponent } from './components/downloadmodal/downloadmodal.component';
import { SidedownloadComponent } from './components/sidedownload/sidedownload.component';
import { SidesearcherComponent } from './components/sidesearcher/sidesearcher.component';
import { ActionsmodalComponent } from './components/actionsmodal/actionsmodal.component';
import { AboutModalComponent } from './components/about-modal/about-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    NavbarComponent,
    DownloadmodalComponent,
    SidedownloadComponent,
    SidesearcherComponent,
    ActionsmodalComponent,
    AboutModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    MaterializeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
