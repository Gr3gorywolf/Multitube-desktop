import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { async } from '@angular/core/testing';
import { SearchResult, Kind } from '../interfaces/SearchResult';
import { Remote } from 'electron';

import { HttpClient } from '@angular/common/http';
import { YoutubeVideosScraper } from '../Utils/YoutubeVideosScraper';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private electronInstance: Remote;
  private ytSearch: any;
  private fs: any;
  private keys: Array<string> = [];
  private opts: any;
  public searchResults:Array<SearchResult> = [];
  public recommendedVideos:Array<SearchResult> = [];
  public trendsVideos:Array<SearchResult> = [];
  public isLoading = false;
  constructor(private electron: ElectronService, private zone: NgZone,private client:HttpClient) {
    this.electronInstance = electron.remote;
    this.ytSearch = this.electronInstance.require('youtube-search');
    var fs = this.electronInstance.require('fs');
    this.fillKeys();
    this.opts = {

      maxResults: 50,
      key: this.keys[0]
    };

  }

  public searchForResults(query: string) {
    this.getRecommendedVideos();
    this.isLoading = true;
    this.ytSearch(query, this.opts,(err, results:Array<SearchResult>) => {
      this.zone.run(() => {
        this.isLoading = false;
      if (err) {
          this.searchForResults(query);
          console.log(err);
          this.keys.shift();
          return null

      } else {
          this.searchResults = results.filter(ax=>ax.kind == Kind.YoutubeVideo);
      }
      })
    });
  }


  public getRecommendedVideos(){
     this.client.get("https://m.youtube.com",{responseType: 'text'}).subscribe((res) => {
            var scraper = new YoutubeVideosScraper(res);
            this.recommendedVideos = scraper.scrapYoutubeHomePage().slice(0,25);

     });

  }

  public getTrendingVideos(){
    this.client.get("https://m.youtube.com/feed/trending",{responseType: 'text'}).subscribe((res) => {
      var scraper = new YoutubeVideosScraper(res);
      this.trendsVideos =  scraper.scrapYoutubeTrendsPage().slice(0,25);
   });

  }





  private fillKeys() {
    this.keys = [];
    this.keys.push("AIzaSyB5C5btDfmVDKFihUkFPfWUYPmfSIT3nxk");
    this.keys.push("AIzaSyAn2rU7EeGvAkqK1gPCaZ7Rh1ZkaVcFQAA");
    this.keys.push('AIzaSyDc0ZAEj9UeC3gBnkgUJfkC2Yw5u3-dd54');
    this.keys.push('AIzaSyChhgpOaQQoNAv1v5tq-ix9B4Qf2p9E4PY');
    this.keys.push('AIzaSyCG_yxDSI4PHUoYs4_tFcpBGgpYJLJFUXY');
    this.keys.push('AIzaSyA5SZXDO8YEh5tsiNR-mMs4Z-HBhww5xAg');
    this.keys.push('AIzaSyClecuVQRr7vq4uAWoE2prAKtIbB_1XjSY');
    this.keys.push('AIzaSyDUwQGUszSHYtHACeEr1SvqkXO5fvxIoIw');
    this.keys.push('AIzaSyAhjp9aYRz6QuYJOvlrAOQtFB-X4saNwqo');
    this.keys.push('AIzaSyByBCH-UH3Px06Kb3ZvNHONWQeQRaR27p0');
    this.keys.push('AIzaSyDtKGulZaN_Dg8sjjh-QR-rqszZ5xVFyTA');
    this.keys.push('AIzaSyAYhv_IHm1VdWHmPcvtNTBJQCCflbJ8-HE');
  }
}
