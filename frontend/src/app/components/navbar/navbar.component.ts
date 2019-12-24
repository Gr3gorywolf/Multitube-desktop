import { Component, OnInit } from '@angular/core';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public play:PlaybackserviceService) { }

  ngOnInit() {
  }

}
