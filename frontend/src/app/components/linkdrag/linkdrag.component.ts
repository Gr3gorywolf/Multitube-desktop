import { Component, OnInit, NgZone } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { toast } from 'angular2-materialize';
import { ModalsService } from 'src/app/services/modals.service';
import { PlayListItem } from 'src/app/models/PlaylistItem';
import { VideoInfo } from 'src/app/interfaces/VideoInfo';
import { error } from 'util';
declare let $: any;
@Component({
  selector: 'app-linkdrag',
  templateUrl: './linkdrag.component.html',
  styleUrls: ['./linkdrag.component.css']
})
export class LinkdragComponent implements OnInit {

  counter = 0;
  dragging = false;
  currentElement: any = null
  isLoadingInfo: boolean = false;
  constructor(public zone: NgZone, public search: SearchService, public modal: ModalsService) { }

  ngOnInit() {

    $(document).ready(() => {

      $(window).on('dragenter', (e) => {
        e.preventDefault();
        this.counter++;
        this.zone.run(() => {
          this.draggedOver(null);
        });
      });

      $(window).on('dragleave', (e) => {
        this.counter--;
        this.zone.run(() => {
          this.dragEnd();
        });
      });

      $(window).on('dragover', (event) => {
        event.preventDefault();
      })

      $(window).on('drop dragdrop', (e) => {
        this.zone.run(() => {
          this.dragDropped(e);
        });


      });

      $(window).on('paste', (e) => {
        this.zone.run(() => {
          this.handleUrlInput(e);
        });
    });
  })
}

  draggedOver(event) {
    console.log("pase");
    this.dragging = true;

  }
  dragDropped(event) {
    console.log("dropie");
    console.log(event);
    try {
      event.originalEvent.dataTransfer.items[0].getAsString((str: string) => {

         this.handleUrlInput(str);
      })
    } catch (ex) {
     this.executeInvalidInput();
    }
  }






   handleUrlInput (e) {

    // e.preventDefault();
    let text =  (e.originalEvent || e).clipboardData.getData('text/plain')
    this.dragging = true;
    this.loadInfo(text);

   }

   loadInfo(url:string){
    console.log(url);
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      this.isLoadingInfo = true;
      this.search.getVideoInfo(url, (info: VideoInfo) => {
        if (info) {
          this.modal.selectedItem = ({
            title: info.title,
            url: info.video_url
          } as PlayListItem);
          this.modal.OpenActionsModal();
        }
        this.isLoadingInfo = false;
        this.counter = 0;
        this.dragging = false;
      });
    } else {
      this.executeInvalidInput();
    }
   }

  private executeInvalidInput(){
    toast("Link no valido", 1000)
    this.isLoadingInfo = false;
    this.counter = 0;
    this.dragging = false;

  }

  dragEnd() {
    console.log("acabe");
    if (this.counter === 0) {
      this.dragging = false;
    }
  }

}
