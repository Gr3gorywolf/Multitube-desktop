import { Component, OnInit } from '@angular/core';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';
import { toast } from 'angular2-materialize';
import { Router } from '@angular/router';
import { TcpService } from 'src/app/services/tcp.service';
import { DownloadService } from 'src/app/services/download.service';
declare var $:any
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private play:PlaybackserviceService,
    private router:Router,
    private tcp:TcpService,
    private download:DownloadService) { }
  searchQuery:string="";
  ngOnInit() {
  }
  search(event:KeyboardEvent){
    if(event.key.toLowerCase() == "enter"){
        this.router.navigateByUrl("searcher/"+this.searchQuery)
    }
  }
  closeSideNav(){
    $('.button-collapse').sideNav('hide');

  }

}
