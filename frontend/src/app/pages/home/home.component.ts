import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HomeSection } from 'src/app/models/HomeSection';
import { SearchService } from 'src/app/services/search.service';
import { UrlHelper } from 'src/app/Utils/UrlHelper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  sections:Array<HomeSection> = [
     {index:0,icon:"home",title:"Inicio"},
     {index:1,icon:"trending_up",title:"Tendencias"},
     {index:2,icon:"thumb_up",title:"Favoritos"},

  ];
  currentSection:number;
  constructor(private search:SearchService) {



  }




  ngOnInit() {
    this.currentSection =  0;
    this.search.getRecommendedVideos();
    this.search.getTrendingVideos();

  }

  getImage(url:string){
     return new UrlHelper().getThumbnailFromUrl(url);
  }

  setCurrentSection(index){
     this.currentSection = index;
  }

}
