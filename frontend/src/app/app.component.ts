import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TcpService } from './services/tcp.service';
import { PlaybackserviceService } from './services/playbackservice.service';
import { SettingsService } from './services/settings.service';
import { DownloadService } from './services/download.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(public routing: Router,
    public tcp:TcpService,
    private play:PlaybackserviceService,
    private settings:SettingsService,
    private download:DownloadService) {
    settings.initSettings();
    tcp.initServer();
    download.initDownloads();

  }

  ngOnInit() {

  }

  isOnIndex() {
    return this.routing.url == "/"
  }
}
