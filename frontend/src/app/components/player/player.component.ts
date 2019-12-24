import { Component, OnInit } from '@angular/core';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';
import { ElectronService } from 'ngx-electron';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {


  currentTab:number = 0;
  constructor(public play:PlaybackserviceService,public modal:ModalsService) { }

  ngOnInit() {
    this.play.play();
  }
  selectTab(tab:number){
      this.currentTab = tab;

  }
  openAboutModal(){
    this.modal.OpenAboutModal();
  }

}
