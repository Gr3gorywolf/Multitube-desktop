import { Component, OnInit, AfterContentInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';
import { ElectronService } from 'ngx-electron';
import { ModalsService } from 'src/app/services/modals.service';
import { VideoInfo, RelatedVideo } from 'src/app/interfaces/VideoInfo';
import { PlayListItem } from 'src/app/models/PlaylistItem';
import { UrlHelper } from 'src/app/Utils/UrlHelper';
import { OverflowHelper } from 'src/app/Utils/OverflowHelper';
import { RouterModule, Router } from '@angular/router';
import { TcpService } from 'src/app/services/tcp.service';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {


  currentTab: number = 0;
  detectionid: any = 0;
  constructor(public play: PlaybackserviceService,
    public modal: ModalsService,
     public change: ChangeDetectorRef,
     public Route:Router,
     private tcp: TcpService) { }

  ngOnInit() {
    //this.tcp.initServer();
  }

  ngOnDestroy() {
    clearImmediate(this.detectionid);
  }






  ngAfterViewInit() {
    new OverflowHelper().toggleOverflow();
    window.addEventListener('resize', function (event) {
      // do stuff here
      new OverflowHelper().toggleOverflow();


    });
    this.detectionid = setInterval(() => {
      this.change.detectChanges();
    }, 2000)
  }

  trackByFn(index, item) {
    return item.id; // or item.id
  }
  selectTab(tab: number) {
    this.currentTab = tab;

  }
  getImage(url: string) {
    if (url == this.play.info.video_url) {
      return "assets/img/circula.png"
    } else {
      return new UrlHelper().getThumbnailFromUrl(url);
    }

  }
  openAboutModal() {
    this.modal.OpenAboutModal();
  }
  openAddModal(suggestion: RelatedVideo) {
    var videoUrl = "https://www.youtube.com/watch?v=" + suggestion.id;
    this.modal.selectedItem = ({
      title: suggestion.title,
      url: videoUrl
    } as PlayListItem);
    this.modal.OpenActionsModal();
  }
  openAddModalAsQuenue(item: PlayListItem) {
    var videoUrl = item.url;
    this.modal.selectedItem = item
    this.modal.OpenActionsModal();
  }
 isPlayerVisible(){
   return this.Route.url == "/"
 }



}

