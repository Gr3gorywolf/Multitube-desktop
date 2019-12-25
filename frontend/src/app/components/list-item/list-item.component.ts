import { Component, OnInit, Input ,ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { VideoInfo, RelatedVideo } from 'src/app/interfaces/videoinfo';
import { PlayListItem } from 'src/app/models/PlaylistItem';
import { UrlHelper } from 'src/app/Utils/UrlHelper';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {
  detectionid:any;
@Input() relatedvideo:RelatedVideo = null;
@Input() listItem: PlayListItem  = null;
@Input() currentPlayingUrl = null;
selectedItem:PlayListItem;
  constructor(public play:PlaybackserviceService) { }

  ngOnInit() {
    if(this.listItem !=  null){
      this.selectedItem = this.listItem
    }
    if(this.relatedvideo !=  null){
      this.selectedItem = ({
          title:this.relatedvideo.title,
          url:"https://www.youtube.com/watch?v="+this.relatedvideo.id

      } as PlayListItem)
    }


  }
  getImage(url:string){
    if(url == this.currentPlayingUrl){
        return "assets/img/circula.png"
    }else{
      return new UrlHelper().getThumbnailFromUrl(url);
    }

  }
ngOnDestroy(){
  clearInterval(this.detectionid);
}
canDelete(){
 return this.play.quenue.find((ax)=>ax.url == this.selectedItem.url) != undefined
}
playVideo(){
 this.play.loadVideo(this.selectedItem.url);
}
addVideo(){
  this.play.addToQueue(this.selectedItem);
}
deleteVideo(){
  this.play.removeFromQueue(this.selectedItem);
}
}
