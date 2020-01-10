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
    public play:PlaybackserviceService,
    public settings:SettingsService,
    public download:DownloadService,
    public route:Router) {
    settings.initSettings();
    tcp.initServer();
    download.initDownloads();

  }

  ngOnInit() {
       this.route.navigateByUrl("/home");
  }

  isOnIndex() {
    return this.routing.url == "/"
  }
}
