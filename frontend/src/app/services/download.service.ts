import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { VideoInfo } from '../interfaces/VideoInfo';
import { toast } from 'angular2-materialize';
import { DownloadItem } from '../models/DownloadItem';
import { Request } from 'request';
import { RegexHelper } from '../Utils/RegexHelper';
import { Remote } from 'electron';
import { SettingsService } from './settings.service';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root'
})
export class DownloadService {


  downloads: Array<DownloadItem> = [];
  ongoingDownloads: number = 0;
  electronInstance: Remote;
  ytdl: any;
  fs: any;
  request: any;
  electronApp: Electron.App;
  constructor(
    private electron: ElectronService,
    private zone: NgZone,
    private sett: SettingsService,
    private notification: NotificationService) {
    this.electronInstance = electron.remote;
    this.ytdl = this.electronInstance.require('ytdl-core');
    this.request = this.electronInstance.require('request');
    this.fs = this.electronInstance.require('fs');
    this.electronApp = this.electronInstance.app;
  }



  public initDownloads() {
    this.getDownloadHistory((down: Array<DownloadItem>) => {
      this.downloads = down;
    });
  }

  //if is a youtube music video the title by default doesnt contain the artist name
  //so in that cases this function will use the channel name alongside with the title
  private getYoutubeMusicTitle(info: VideoInfo) {
    if (info.author.name.toLowerCase().indexOf("topic") > 0) {

      let cleanChannelName = info.author.name;
      if (cleanChannelName.includes("-")) {
        cleanChannelName = cleanChannelName.split("-")[0].trim();
      }
      return `${cleanChannelName} - ${info.title}`;
    } else {
      return info.title;
    }
  }
  public quenueDownload(url: string, qualityLabel: string, callback: Function = null) {

    this.ytdl.getInfo(url, (err, info: VideoInfo) => {
      callback()
      if (err) {
        toast("Ocurrio un problema al obtener la informacion del video", 1000);
        return;
      } else {
        console.log("encontre info");
        for (var format of info.formats) {
          if (format.audioBitrate != null && format.qualityLabel === qualityLabel) {
            let rgx = new RegexHelper();

            let cleanTitle = rgx.removeIllegalPathCharacters(this.getYoutubeMusicTitle(info));
            let fileExtension = qualityLabel == null ? ".mp3" : ".mp4";
            let cleanPath = rgx.normalizePath(this.sett.selectedDownloadPath);
            let fullPath = `${cleanPath}/${cleanTitle}${fileExtension}`;

            var download = {
              downloadPath: fullPath,
              fileName: cleanTitle + fileExtension,
              progress: 0,
              quality: qualityLabel,
              title: cleanTitle,
              url: info.video_url,
              downloadUrl: format.url

            } as DownloadItem

            this.executeDownload(download);
            break;
          }

        }



      }

    });
  }



  public getDownloadHistory(callback: Function) {
    var dir = this.electronApp.getPath('userData').replace(/\\/g, "/") + '/gr3cache';
    let registryFile = dir + "/" + "downloads.json";
    this.fs.readFile(registryFile, (err, data: Buffer) => {
      if (!err) {
        this.zone.run(() => {
          callback(JSON.parse(data.toString()))
        });
      }
    });
  }

  private addDownloadToHistory(down: DownloadItem) {

    var dir = this.electronApp.getPath('userData').replace(/\\/g, "/") + '/gr3cache';
    let registryFile = dir + "/" + "downloads.json";
    if (!this.fs.existsSync(dir)) {
      this.fs.mkdirSync(dir);
    }
    var downloads: Array<DownloadItem> = [];
    this.fs.readFile(registryFile, (err, data: Buffer) => {
      if (!err) {
        downloads = JSON.parse(data.toString());
      }
      downloads.push(down);
      this.fs.writeFile(registryFile, JSON.stringify(downloads),
        (err) => {
          if (err) {
            return console.log(err);
          }


        });
      throw err;

    });

  }


  private executeDownload(download: DownloadItem) {

    this.notification.notify("Descargando: " + download.title
      , "Click el icono para ver el progreso"
      , download.url);

    console.log("ejecute la descarga");
    var received_bytes = 0;
    var total_bytes = 0;
    console.log(download.downloadPath);
    var req: Request = this.request({
      method: 'GET',
      uri: download.downloadUrl
    });

    var out: NodeJS.WritableStream = this.fs.createWriteStream(download.downloadPath);
    req.pipe(out);
    req.on("data", (chunk) => {
      this.zone.run(() => {
        received_bytes += chunk.length;
        let itemIdx = this.downloads.indexOf(download);
        if (itemIdx != -1) {
          let percent = (received_bytes * 100) / total_bytes;
          this.downloads[itemIdx].progress = Math.round(percent);
          this.downloads = this.downloads;
        }
      });


    });

    req.on('response', (data) => {
      this.zone.run(() => {
        total_bytes = parseInt(data.headers['content-length']);
        this.downloads.push(download);
        this.ongoingDownloads++;
        toast('Nueva descarga añadida!!', 1000);
      });
    });

    req.on('end', () => {
      this.zone.run(() => {
        if (this.ongoingDownloads > 0) {
          this.ongoingDownloads--;
        }
        this.addDownloadToHistory(download);
      });
    });




  }
}
