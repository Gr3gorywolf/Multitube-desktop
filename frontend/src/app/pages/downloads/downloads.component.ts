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

}
