import { Injectable, ChangeDetectorRef, NgZone, ApplicationRef } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { from } from 'rxjs';
import { VideoInfo } from '../interfaces/videoinfo';
import { PlayListItem } from '../models/PlaylistItem';
import { toast } from 'angular2-materialize';
import { VideoQuality } from '../models/VideoQuality';

@Injectable({
  providedIn: 'root'
})
export class PlaybackserviceService {

  public videoSources:Array<VideoQuality> = []
  public currentElementUrl: string;
  public info: VideoInfo;
  public quenue: Array<PlayListItem> = [];
  public isLoading: boolean = false;
  public isAutoplayEnabled = true;
  perro: any;
  fs: any;
  ytdl: any;

  constructor(public electron: ElectronService, public zone: NgZone,public apprf:ApplicationRef) {

    this.perro = electron.remote;
    this.fs = this.perro.require('fs');
    this.ytdl = this.perro.require('ytdl-core');
  }





  loadVideo(url: string) {
    let id = url.split("=")[1];
    url = "http://www.youtube.com/watch\?v\="+id;
    this.isLoading = true;
    this.ytdl.getInfo(url, (err, info: VideoInfo) => {

      this.zone.run(() => {
        this.isLoading = false;
        this.addToQueue({
          title: info.title,
          url: info.video_url

        } as PlayListItem)

      if (err) throw err;
      this.info = info;
    })
    this.videoSources = [];
    var availableQualities = ["144p","240p","360p","480p","720p","1080p"]
      for (var i = 0; i < info.formats.length; i++) {
        var format = info.formats[i];
        if (availableQualities.indexOf(format.qualityLabel) != -1) {
          this.zone.run(() => {

            this.currentElementUrl = format.url;
            this.videoSources.push({
                src : format.url,
                qualityLabel : format.qualityLabel

            } as VideoQuality)
          });

        }
      }
       this.apprf.tick();

    });
  }

  addToQueue(item: PlayListItem) {
    if (this.quenue.find((ax) => ax.url == item.url) == undefined) {
      this.quenue.push(item);
      toast('El elemento agregado a la cola exitosamente');
    } else {
      toast('El elemento ya existe en la cola');
    }
  }

  removeFromQueue(item: PlayListItem) {
    var searchedElement = this.quenue.find((ax) => ax.url == item.url);
    if (searchedElement != undefined) {
      var idx = this.quenue.indexOf(searchedElement);
      console.log(idx);
      if (searchedElement.url != this.info.video_url) {
        this.quenue.splice(idx, 1);
      } else {
        toast('No se puede eliminar un elemento en reproduccion');
      }
    }
    else {
      toast('El elemento no existe en la cola')
    }
  }
  playNext() {

    var currentPlaying = this.quenue.find(ax => ax.url == this.info.video_url);
    if (currentPlaying != undefined) {
      var nextIndex = this.quenue.indexOf(currentPlaying) +1;
      console.log(nextIndex);
      console.log(this.quenue.length);
      if (nextIndex > this.quenue.length-1 && this.isAutoplayEnabled) {
        let relatedUrl = this.info.related_videos[0].id;
        if (relatedUrl != undefined) {
          this.loadVideo("https://www.youtube.com/watch?v=" + relatedUrl)
        }

      }else
      if(nextIndex <= this.quenue.length-1) {
        this.loadVideo(this.quenue[nextIndex].url);
      }
    }
  }

}
