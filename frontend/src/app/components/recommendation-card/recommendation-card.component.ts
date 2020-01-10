import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PlaybackserviceService } from 'src/app/services/playbackservice.service';
import { DownloadService } from 'src/app/services/download.service';
import { SearchResult } from 'src/app/interfaces/SearchResult';
import { ModalsService } from 'src/app/services/modals.service';
import { Router } from '@angular/router';
import { PlayListItem } from 'src/app/models/PlaylistItem';
import { UrlHelper } from 'src/app/Utils/UrlHelper';

@Component({
  selector: 'app-recommendation-card',
  templateUrl: './recommendation-card.component.html',
  styleUrls: ['./recommendation-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationCardComponent implements OnInit {
  @Input() recommendation: SearchResult;
  constructor(
    public play: PlaybackserviceService,
    public download: DownloadService,
    public modal: ModalsService,
    public router: Router) { }
  ngOnInit() {
  }

  getImage() {
    return new UrlHelper().getThumbnailFromUrl(this.recommendation.link);
  }

  playVideo() {
    this.play.loadVideo(this.recommendation.link);
    this.router.navigateByUrl("/");
  }

  downloadVideo() {
    this.modal.selectedItem = {
      title: this.recommendation.title,
      url: this.recommendation.link
    } as PlayListItem;
    this.modal.OpenDownloadModal();
  }

  addVideo() {
    this.play.addToQueue({
      title: this.recommendation.title,
      url: this.recommendation.link
    } as PlayListItem);
  }
}
