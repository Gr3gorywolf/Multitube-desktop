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

  isFetchingInfo = false;
  ngOnInit() {


  }


  closeModal(){
    if(!this.isFetchingInfo){
      this.modal.CloseDownloadModal();
    }else{
      toast("Debe esperar hasta que se procese la descarga",1000);
    }

  }
  beginDownload(quality:string){
    this.isFetchingInfo = true;
    toast("Procesando descarga",1000);
   this.download.quenueDownload(this.modal.selectedItem.url,quality,()=>{
    this.isFetchingInfo = false;
    this.closeModal();
   });

  }

}
