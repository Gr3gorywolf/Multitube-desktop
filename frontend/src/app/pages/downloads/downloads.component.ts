import { Component, OnInit } from '@angular/core';
import { DownloadItem } from 'src/app/models/DownloadItem';
import { UrlHelper } from 'src/app/Utils/UrlHelper';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  constructor(public download:DownloadService) { }

  ngOnInit() {
  }
  getImage(down:DownloadItem){
    return new UrlHelper().getThumbnailFromUrl( down.url);
  }
  getQualityString(down:DownloadItem){
    return (down.quality == null) ?"Audio":"Video"
  }

}
