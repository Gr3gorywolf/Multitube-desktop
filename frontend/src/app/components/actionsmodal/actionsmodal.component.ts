import { Component, OnInit } from '@angular/core';
import { ModalsService } from 'src/app/services/modals.service';
import { UrlHelper } from 'src/app/Utils/UrlHelper';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-actionsmodal',
  templateUrl: './actionsmodal.component.html',
  styleUrls: ['./actionsmodal.component.css']
})
export class ActionsmodalComponent implements OnInit {

  constructor(public modal: ModalsService, public play: PlaybackserviceService,public download:DownloadService) { }

  ngOnInit() {
  }

  getThumbnail() {
    return new UrlHelper().getThumbnailFromUrl(this.modal.selectedItem.url);
  }
  canDelete() {
    return this.play.quenue.find((ax) => ax.url == this.modal.selectedItem.url) != undefined
  }
  playVideo() {
    this.play.loadVideo(this.modal.selectedItem.url);
    this.modal.CloseActionsModal();
  }
  addVideo() {
    this.play.addToQueue(this.modal.selectedItem);
    this.modal.CloseActionsModal();
  }
  downloadVideo(){
    this.modal.CloseActionsModal();
    this.modal.OpenDownloadModal();
  }
  deleteVideo() {
    this.play.removeFromQueue(this.modal.selectedItem);
    this.modal.CloseActionsModal();
  }
}
