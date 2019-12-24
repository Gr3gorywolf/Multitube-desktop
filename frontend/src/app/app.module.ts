import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { MaterializeModule } from "angular2-materialize";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DownloadmodalComponent } from './components/downloadmodal/downloadmodal.component';
import { SidedownloadComponent } from './components/sidedownload/sidedownload.component';
import { SidesearcherComponent } from './components/sidesearcher/sidesearcher.component';
import { ActionsmodalComponent } from './components/actionsmodal/actionsmodal.component';
import { AboutModalComponent } from './components/about-modal/about-modal.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    NavbarComponent,
    DownloadmodalComponent,
    SidedownloadComponent,
    SidesearcherComponent,
    ActionsmodalComponent,
    AboutModalComponent,
    VideoPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    MaterializeModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
