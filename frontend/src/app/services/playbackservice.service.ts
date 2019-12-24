import { Injectable, ChangeDetectorRef, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { from } from 'rxjs';
import { VideoInfo } from '../interfaces/videoinfo';

@Injectable({
  providedIn: 'root'
})
export class PlaybackserviceService {


  public currentElementUrl: string;
  public info:VideoInfo;
  public isLoading:boolean = false;
  perro: any;
  fs: any;
  ytdl: any;

  constructor(public electron: ElectronService, public zone: NgZone) {

    this.perro = electron.remote;
    this.fs = this.perro.require('fs');
    this.ytdl = this.perro.require('ytdl-core');
  }





  play() {
    this.isLoading = true;
    this.ytdl.getInfo("https://www.youtube.com/watch?v=-kQVnqVwz_A", (err, info:VideoInfo) => {

      this.zone.run(() => {
        this.isLoading = false;
      })
      if (err) throw err;
      this.info = info;
      for (var i = 0; i < info.formats.length; i++) {


        if (info.formats[i].qualityLabel == "360p") {
          this.zone.run(() => {

            this.currentElementUrl = info.formats[i].url;
          });
          break;

        }
      }


    });
  }
}
