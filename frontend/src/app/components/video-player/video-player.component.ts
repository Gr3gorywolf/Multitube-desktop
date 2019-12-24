import { Component, OnInit,ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit,AfterViewInit {
   player: any;
  constructor(public play:PlaybackserviceService) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
     this.player = document.getElementById("videotag");
    this.player.onended = ()=>{
      console.log("paseee");
            this.play.playNext();

    }
}

}
