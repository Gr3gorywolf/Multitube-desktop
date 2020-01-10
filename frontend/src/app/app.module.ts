import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { MaterializeModule } from "angular2-materialize";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlayerComponent } from './pages/player/player.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DownloadmodalComponent } from './components/downloadmodal/downloadmodal.component';
import { SidedownloadComponent } from './components/sidedownload/sidedownload.component';
import { SidesearcherComponent } from './components/sidesearcher/sidesearcher.component';
import { ActionsmodalComponent } from './components/actionsmodal/actionsmodal.component';
import { AboutModalComponent } from './components/about-modal/about-modal.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { SearcherComponent } from './pages/searcher/searcher.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ConnectedClientsComponent } from './pages/connected-clients/connected-clients.component';
import { RemoteServerStatusComponent } from './components/remote-server-status/remote-server-status.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DownloadItemComponent } from './components/download-item/download-item.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { HomeComponent } from './pages/home/home.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RecommendationCardComponent } from './components/recommendation-card/recommendation-card.component';
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
    VideoPlayerComponent,
    ListItemComponent,
    SearcherComponent,
    PreloaderComponent,
    ConnectedClientsComponent,
    RemoteServerStatusComponent,
    SearchResultComponent,
    DownloadsComponent,
    SettingsComponent,
    DownloadItemComponent,
    HomeComponent,
    PageHeaderComponent,
    RecommendationCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    MaterializeModule,
    FormsModule,
    QRCodeModule,
    HttpClientModule,
    DragDropModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
