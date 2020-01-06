import { Component, OnInit, Input } from '@angular/core';
import { DownloadItem } from 'src/app/models/DownloadItem';
import { UrlHelper } from 'src/app/Utils/UrlHelper';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-download-item',
  templateUrl: './download-item.component.html',
  styleUrls: ['./download-item.component.css']
})
export class DownloadItemComponent implements OnInit {

  @Input() download:DownloadItem;
  constructor(private electron:ElectronService) { }

  ngOnInit() {
  }
  getImage(){
    return new UrlHelper().getThumbnailFromUrl( this.download.url);
  }
  getQualityString(){
    return (this.download.quality == null) ?"Audio":"Video"
  }
  isDownloading(){
    return this.download.progress != 100;
  }
  play(){
   this.electron.remote.shell.openItem(this.download.downloadPath);
  }
  openInFolder(){
    this.electron.remote.shell.showItemInFolder(this.download.downloadPath);
  }

}
