import { Component, OnInit } from '@angular/core';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';
import { ElectronService } from 'ngx-electron';
import { ModalsService } from 'src/app/services/modals.service';
import { VideoInfo, RelatedVideo } from 'src/app/interfaces/videoinfo';
import { PlayListItem } from 'src/app/models/PlaylistItem';
import { UrlHelper } from 'src/app/Utils/UrlHelper';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {


  currentTab:number = 0;
  constructor(public play:PlaybackserviceService,public modal:ModalsService) { }

  ngOnInit() {
   this.play.loadVideo("https://www.youtube.com/watch?v=-kQVnqVwz_A");
  }
  selectTab(tab:number){
      this.currentTab = tab;

  }
  getImage(url:string){
    if(url == this.play.info.video_url){
        return "assets/img/circula.png"
    }else{
      return new UrlHelper().getThumbnailFromUrl(url);
    }

  }
  openAboutModal(){
    this.modal.OpenAboutModal();
  }
  openAddModal(suggestion:RelatedVideo){
    var videoUrl = "https://www.youtube.com/watch?v="+suggestion.id;
        this.modal.selectedItem = ({
        title:suggestion.title,
        url:videoUrl
        } as PlayListItem);
        this.modal.OpenActionsModal();
  }
  openAddModalAsQuenue(item:PlayListItem){
    var videoUrl = item.url;
        this.modal.selectedItem = item
        this.modal.OpenActionsModal();
  }
}
