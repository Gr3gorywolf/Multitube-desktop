import { Injectable, ChangeDetectorRef, NgZone, ApplicationRef, Injector } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { from } from 'rxjs';
import { VideoInfo } from '../interfaces/videoinfo';
import { PlayListItem } from '../models/PlaylistItem';
import { toast } from 'angular2-materialize';
import { VideoQuality } from '../models/VideoQuality';
import { TcpService } from './tcp.service';
declare var $: any;
@Injectable({
  providedIn: 'root'
})

export class PlaybackserviceService {

  public videoSources: Array<VideoQuality> = [];
  public currentElementUrl: string;
  public info: VideoInfo = null;
  public quenue: Array<PlayListItem> = [];
  public isLoading = false;
  public isAutoplayEnabled = true;
  public playerInstance: any = null;
  public isPlayerFullScreen = false;
  electronInstance: any;
  fs: any;
  ytdl: any;

  constructor(private electron: ElectronService, private zone: NgZone, private apprf: ApplicationRef) {
    this.electronInstance = electron.remote;
    this.fs = this.electronInstance.require('fs');
    this.ytdl = this.electronInstance.require('ytdl-core');
  }


  loadVideo(url: string) {
    const id = url.split('=')[1];

    this.isLoading = true;
    this.ytdl.getInfo(url, (err, info: VideoInfo) => {

      this.zone.run(() => {
        this.isLoading = false;
        this.addToQueue({
          title: info.title,
          url: info.video_url

        } as PlayListItem);

        if (err) { throw err; }
        this.info = info;
      });
      this.videoSources = [];
      const availableQualities = ['144p', '240p', '360p', '480p', '720p', '1080p'];
      console.log(info.formats);
      for (let i = 0; i <info.formats.length; i++) {
        const format = info.formats[i];
        if ( format.audioBitrate != null) {
          this.zone.run(() => {

            this.currentElementUrl = format.url;
            this.videoSources.push({
              src: format.url,
              qualityLabel: "480"

            } as VideoQuality);
          });

        }
      }
      this.apprf.tick();

    });

  }

  addToQueue(item: PlayListItem) {

    if (this.quenue.find((ax) => ax.url === item.url) === undefined) {
      this.quenue.push(item);
    } else {
      // toast('El elemento ya existe en la cola', 1000);
    }

  }
  addToQuenueByUrl(url: string) {
    toast("Agregando: " + url, 1000);
    this.ytdl.getInfo(url, (err, info: VideoInfo) => {
      toast(info.title + " Agregado a la cola exitosamente", 1000);
      this.zone.run(() => {
        this.isLoading = false;
        this.addToQueue({
          title: info.title,
          url: info.video_url

        } as PlayListItem);

        if (err) { throw err; }

      });
    });

  }


  removeFromQueue(item: PlayListItem) {
    const searchedElement = this.quenue.find((ax) => ax.url === item.url);
    if (searchedElement !== undefined) {
      const idx = this.quenue.indexOf(searchedElement);
      console.log(idx);
      if (searchedElement.url !== this.info.video_url) {
        this.quenue.splice(idx, 1);
        toast(searchedElement.title + ' Eliminado de la cola exitosamente!', 1000);
      } else {
        toast('No se puede eliminar un elemento en reproduccion', 1000);
      }
    } else {
      toast('El elemento no existe en la cola', 1000);
    }

  }

  playPrevious() {
    const currentPlaying = this.quenue.find(ax => ax.url === this.info.video_url);
    if (currentPlaying !== undefined) {
      const previousIndex = this.quenue.indexOf(currentPlaying) - 1;
      console.log(previousIndex);
      console.log(this.quenue.length);

      if (previousIndex > 0 && previousIndex <= this.quenue.length - 1) {
        this.loadVideo(this.quenue[previousIndex].url);
      }
    }
  }
  playNext() {

    const currentPlaying = this.quenue.find(ax => ax.url === this.info.video_url);
    if (currentPlaying !== undefined) {
      const nextIndex = this.quenue.indexOf(currentPlaying) + 1;
      console.log(nextIndex);
      console.log(this.quenue.length);
      if (nextIndex > this.quenue.length - 1 && this.isAutoplayEnabled) {
        const relatedUrl = this.info.related_videos[0].id;
        if (relatedUrl !== undefined) {
          this.loadVideo('https://www.youtube.com/watch?v=' + relatedUrl);
        }

      } else
        if (nextIndex <= this.quenue.length - 1) {
          this.loadVideo(this.quenue[nextIndex].url);
        }
    }
  }

  toggleFullscreen() {
    $(".plyr").removeClass("floating-video");
    $(".plyr").removeClass("fullscreen-video");
    if (!this.isPlayerFullScreen) {
      $(".plyr").addClass("fullscreen-video");
    } else {
      this.isPlayerFullScreen = false;
    }

  }

}
