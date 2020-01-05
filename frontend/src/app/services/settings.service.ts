import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Remote} from 'electron';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  electronInstance:Remote;
  settingsInstance:any;
  public notificationsEnabled
  constructor(private electron:ElectronService) {
     this.electronInstance = electron.remote;
     this.settingsInstance = this.electronInstance.require('electron-settings');

  }

 public get notificationsStatus(){
    let setting = this.settingsInstance.get("settings.notificationsEnabled");
    return setting;
  }
  public set notificationsStatus(value:boolean){
    this.settingsInstance.set("settings.notificationsEnabled",value)
  }
  public get selectedDownloadPath(){
    let setting = this.settingsInstance.get("settings.downloadPath");
    return setting == undefined?this.electronInstance.app.getPath("downloads"):setting
  }

  public set selectedDownloadPath(path:string){
    let setting = this.settingsInstance.set("settings.downloadPath",path);
  }


 initSettings(){
   console.log(this.selectedDownloadPath);
   if(!this.settingsInstance.has('settings')){

    this.settingsInstance.set('settings', {
      downloadPath: this.electronInstance.app.getPath("downloads"),
        quality: "360p",
        notificationsEnabled: true
    });

   }

 }



}
