import { Component, OnInit } from '@angular/core';
import { ModalsService } from 'src/app/services/modals.service';
import { DownloadService } from 'src/app/services/download.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-downloadmodal',
  templateUrl: './downloadmodal.component.html',
  styleUrls: ['./downloadmodal.component.css']
})
export class DownloadmodalComponent implements OnInit {

  constructor(private modal:ModalsService,private download:DownloadService) { }

  ngOnInit() {


  }


  closeModal(){
    this.modal.CloseDownloadModal();
  }
  beginDownload(quality:string){
    this.closeModal();
    toast("Procesando descarga",1000);
   this.download.quenueDownload(this.modal.selectedItem.url,quality);

  }

}
