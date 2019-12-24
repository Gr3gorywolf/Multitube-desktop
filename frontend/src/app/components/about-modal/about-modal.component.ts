import { Component, OnInit } from '@angular/core';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.component.html',
  styleUrls: ['./about-modal.component.css']
})
export class AboutModalComponent implements OnInit {

  constructor(public play:PlaybackserviceService,public modal:ModalsService) { }

  ngOnInit() {
  }

}
