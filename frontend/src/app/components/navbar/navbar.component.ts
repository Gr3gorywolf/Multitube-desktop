import { Component, OnInit } from '@angular/core';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';
import { toast } from 'angular2-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public play:PlaybackserviceService,public router:Router) { }
  searchQuery:string="";
  ngOnInit() {
  }
  search(event:KeyboardEvent){
    if(event.key.toLowerCase() == "enter"){
        this.router.navigateByUrl("searcher/"+this.searchQuery)
    }
  }

}
