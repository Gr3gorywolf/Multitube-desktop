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
    public play:PlaybackserviceService,
    public router:Router,
    public tcp:TcpService,
    public download:DownloadService) { }
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
  navigateToPlayer(){
    if(this.play.quenue.length>0){
      this.router.navigateByUrl("/");
    }else{
      toast("Debe tener almenos 1 elemento en reproduccion")
    }

  }
  getChipValue(value:number){
      if(value > 99){
         return "99+"
      }else{
        return value.toString();
      }
  }

}
