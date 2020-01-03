import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from 'src/app/interfaces/SearchResult';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';
import { Router } from '@angular/router';
import { UrlHelper } from 'src/app/Utils/UrlHelper';
import { PlayListItem } from 'src/app/models/PlaylistItem';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() result: SearchResult;

  constructor(private play: PlaybackserviceService, private router: Router, private modal: ModalsService) { }

  ngOnInit() {
  }

  addVideo() {
    this.play.addToQueue({
      title: this.result.title,
      url: this.result.link
    } as PlayListItem);
  }
  playVideo() {
    this.play.loadVideo(this.result.link);
    this.router.navigateByUrl("/");
  }

  downloadVideo() {
    this.modal.selectedItem = {
      title: this.result.title,
      url: this.result.link
    } as PlayListItem;
    this.modal.OpenDownloadModal();
  }

  getImage() {
    return new UrlHelper().getThumbnailFromUrl(this.result.link);
  }

}
