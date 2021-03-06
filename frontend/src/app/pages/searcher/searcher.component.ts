import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { SearchResult } from 'src/app/interfaces/SearchResult';
import { UrlHelper } from 'src/app/Utils/UrlHelper';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';
import { PlayListItem } from 'src/app/models/PlaylistItem';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearcherComponent implements OnInit,OnDestroy {


  constructor(public route:ActivatedRoute
    , public change: ChangeDetectorRef
    ,public searchSv:SearchService
    ,public play:PlaybackserviceService
    ,public router:Router
    ) { }

  detectionid:any;
  ngOnDestroy(){
    clearInterval(this.detectionid)
  }

  ngOnInit() {


    this.route.params.subscribe( (params: Params) => {
        this.search(params["query"]);
     });

     this.detectionid =  setInterval(() => {
      this.change.markForCheck();
    }, 1000)
  }

   search(query:string){
     this.searchSv.searchForResults(query);
  }



}
