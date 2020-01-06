import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { SettingsService } from './settings.service';
import { UrlHelper } from '../Utils/UrlHelper';
import { PlayListItem } from '../models/PlaylistItem';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifier: any;
  electronInstance: Electron.Remote;
  fs: any;
  downloadManager: any;
  private lastNotification:any;
  constructor(private electron: ElectronService, private settings: SettingsService) {
    this.electronInstance = electron.remote;
    this.notifier = this.electronInstance.require("node-notifier");
    this.fs = this.electronInstance.require("fs");
    this.downloadManager = this.electronInstance.require("electron-download-manager");

  }

  private fetchImage(downloadUrl: string, callback: Function) {

    if (downloadUrl == null) {
      callback();
      return;
    }
    this.downloadManager.download({
      url: downloadUrl
    }, (err, info) => {
      callback();
    })
  }



  notifyByPlayItem(subtitle:string,item:PlayListItem){
   this.notify(item.title,subtitle,item.url);
  }

  notify(title: string, subtitle: string, videoUrl: string = null) {
    if (videoUrl != null) {
      videoUrl = new UrlHelper().getThumbnailFromUrl(videoUrl);
    }
    if (this.settings.notificationsStatus) {
      this.fetchImage(videoUrl, () => {
        let notificationIcon = videoUrl == null? null:this.electronInstance.app.getPath('downloads').replace(/\\/g, "/") + "/mqdefault.jpg"
        let notification = {
          title: title,
          message: subtitle,
          icon:notificationIcon
        }
        if(this.lastNotification !== notification ){
          this.notifier.notify(notification);
          this.lastNotification = notification;
        }
       
      })
    }
  }

}
