import { Injectable, ChangeDetectorRef, NgZone, ApplicationRef, Injector } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { from } from 'rxjs';
import { VideoInfo } from '../interfaces/VideoInfo';
import { PlayListItem } from '../models/PlaylistItem';
import { toast } from 'angular2-materialize';
import { VideoQuality } from '../models/VideoQuality';
import { TcpService } from './tcp.service';
import { Remote } from 'electron';
import { NotificationService } from './notification.service';
import { UrlHelper } from '../Utils/UrlHelper';
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
  private mainProcess: any = null
  electronInstance: Remote;
  fs: any;
  ytdl: any;

  constructor(private electron: ElectronService,
    private zone: NgZone,
    private apprf: ApplicationRef,
    private notification: NotificationService) {
    this.electronInstance = electron.remote;
    this.fs = this.electronInstance.require('fs');
    this.ytdl = this.electronInstance.require('ytdl-core');
    this.mainProcess = this.electronInstance.require('./main.js');
  }




  loadVideo(url: string) {
    const id = url.split('=')[1];

    this.isLoading = true;
    this.ytdl.getInfo(url, (err, info: VideoInfo) => {



      let playItem = ({
        title: info.title,
        url: info.video_url

      } as PlayListItem);
      this.zone.run(() => {
        this.isLoading = false;
        this.addToQueue(playItem,true);
        if (err) {
          toast("Ocurrio un problema al obtener la informacion del video", 1000);
          return;
        }
        this.info = info;
      });
      this.videoSources = [];
      const availableQualities = ['144p', '240p', '360p', '480p', '720p', '1080p'];
      console.log(info.formats);
      for (let i = 0; i < info.formats.length; i++) {
        const format = info.formats[i];
        if (format.audioBitrate != null) {
          this.zone.run(() => {

            this.currentElementUrl = format.url;
            this.videoSources.push({
              src: format.url,
              qualityLabel: "480"

            } as VideoQuality);
          });
        }
      }
      this.notification.notifyByPlayItem("Actualmente reproduciendose",playItem);
      this.updateMediaSession()
      this.apprf.tick();
    });
  }




  addToQueue(item: PlayListItem,preventNotifications:boolean = false) {
    let previousCount = this.quenue.length;
    if (this.quenue.find((ax) => ax.url === item.url) === undefined) {
      this.quenue.push(item);
      if (previousCount == 0) {
        this.loadVideo(item.url);
      }
      toast("Elemento agregado a la cola exitosamente", 1000);
      if(!preventNotifications){
        this.notification.notifyByPlayItem("Agregado a la cola exitosamente", item)
      }
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
        let item = ({
          title: info.title,
          url: info.video_url
        } as PlayListItem);
        this.addToQueue(item);

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

      if (previousIndex >= 0 && previousIndex <= this.quenue.length - 1) {
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
    (document.activeElement as HTMLElement).blur();
    $("#audiotag").focus();
    this.electron.ipcRenderer.send("bringToFront");
    this.electron.ipcRenderer.send("pressKey", "f");

    console.log("ejecute tecla");
  }

  private updateMediaSession(){
    if ('mediaSession' in navigator) {


       let portrait =new UrlHelper().getThumbnailFromUrl(this.info.video_url);
        // @ts-ignore
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.info.title,
        artist: this.info.author.name,
        artwork: [
          { src: portrait, sizes: '96x96', type: 'image/png' },
          { src: portrait, sizes: '128x128', type: 'image/png' },
          { src: portrait, sizes: '192x192', type: 'image/png' },
          { src: portrait, sizes: '256x256', type: 'image/png' },
          { src: portrait, sizes: '384x384', type: 'image/png' },
          { src: portrait, sizes: '512x512', type: 'image/png' },
        ]
      });
    }
     // @ts-ignore
    navigator.mediaSession.setActionHandler('previoustrack',()=> {
     this.playPrevious();
    });
     // @ts-ignore
    navigator.mediaSession.setActionHandler('nexttrack',  ()=> {
      this.playNext();
    });

  }

}
