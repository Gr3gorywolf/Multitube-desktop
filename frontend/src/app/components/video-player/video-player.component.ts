import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';
import { OverflowHelper } from 'src/app/Utils/OverflowHelper';
import { Router } from '@angular/router';
declare var Plyr: any;
declare var $: any;
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  player: any;
  currentElement: string;
  constructor(public play: PlaybackserviceService, public route: Router, public zone: NgZone) { }

  ngOnInit() {

  }


  ngAfterViewInit() {

    this.player = new Plyr('#videotag', {
      hideControls: true,
      ratio: '16:9'


    });
    this.player.on('ended', event => {
      console.log("paseee");
      this.play.playNext();
    });
    $(".plyr").css("max-height", "430px");
    $("#videotag").css("max-height", "430px");
    $(".plyr").click(() => {
      this.zone.run(() => {
        if (!this.isOnPlayer()) {
          this.route.navigateByUrl("/");
        }
      })
    });


    setInterval(() => {
      if (this.play.currentElementUrl != this.currentElement) {


        var sourcesList = [];

        for (var src of this.play.videoSources) {
          sourcesList.push({
            src: src.src,
            type: 'video/mp4',
            size: parseInt(src.qualityLabel.replace("p", "")),
          })
        }
        console.log(sourcesList);

        this.player.source = {
          type: 'video',
          title: 'Example title',
          sources: sourcesList,
          poster: ' ',
          tracks: [],
        };
        this.play.currentElementUrl = this.currentElement;
      }

      $(".plyr").removeClass("floating-video");
       $(".plyr").removeClass("floating-video");
      if (!this.isOnPlayer() && !this.play.isPlayerFullScreen) {
        $(".plyr").addClass("floating-video");
      }

    }, 1000)
    this.play.playerInstance = this.player;
  }

  isOnPlayer() {
    return this.route.url == "/";
  }


}
