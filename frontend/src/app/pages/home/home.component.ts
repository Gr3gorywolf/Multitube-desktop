import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HomeSection } from 'src/app/models/HomeSection';
import { SearchService } from 'src/app/services/search.service';
import { UrlHelper } from 'src/app/Utils/UrlHelper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  sections:Array<HomeSection> = [
     {index:0,icon:"home",title:"Inicio"},
     {index:1,icon:"trending_up",title:"Tendencias"},
     {index:2,icon:"thumb_up",title:"Favoritos"},

  ];
  detectionid: any = 0;
  currentSection:number;
  constructor(public search:SearchService, public change: ChangeDetectorRef) {
  }


  ngOnInit() {
    this.currentSection =  0;
    this.search.getRecommendedVideos();
    this.search.getTrendingVideos();
    this.detectionid = setInterval(() => {
      this.change.markForCheck();
    }, 1500);
  }
  ngOnDestroy() {
    clearInterval(this.detectionid);
  }


  getImage(url:string){
     return new UrlHelper().getThumbnailFromUrl(url);
  }

  setCurrentSection(index){
     this.currentSection = index;
  }

}
