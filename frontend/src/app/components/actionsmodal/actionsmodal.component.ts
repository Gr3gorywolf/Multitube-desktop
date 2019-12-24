import { Component, OnInit } from '@angular/core';
import { ModalsService } from 'src/app/services/modals.service';
import { UrlHelper } from 'src/app/Utils/UrlHelper';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';

@Component({
  selector: 'app-actionsmodal',
  templateUrl: './actionsmodal.component.html',
  styleUrls: ['./actionsmodal.component.css']
})
export class ActionsmodalComponent implements OnInit {

  constructor(public modal:ModalsService,public play:PlaybackserviceService) { }

  ngOnInit() {
  }

getThumbnail(){
  return new UrlHelper().getThumbnailFromUrl(this.modal.selectedItem.url);
}
canDelete(){
 return this.play.quenue.find((ax)=>ax.url == this.modal.selectedItem.url) != undefined
}
playVideo(){
 this.play.loadVideo(this.modal.selectedItem.url);
 this.modal.CloseActionsModal();
}
addVideo(){
  this.play.addToQueue(this.modal.selectedItem);
  this.modal.CloseActionsModal();
}
deleteVideo(){
  this.play.removeFromQueue(this.modal.selectedItem);
  this.modal.CloseActionsModal();
}
}
