import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-remote-server-status',
  templateUrl: './remote-server-status.component.html',
  styleUrls: ['./remote-server-status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteServerStatusComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient,private detector:ChangeDetectorRef) { }
  @Input() address: string = ""
  isRemoteServerOpen: boolean = false
  intervalKey: any;

  getServerUrl(){
     return "http://"+ this.address + ':12345/';
  }
  displayRemoteServer(){
    if(this.isRemoteServerOpen){
      window.open(this.getServerUrl(),"Multitube web");
    }else{
      toast("El servidor remoto no esta abierto",1000);
    }

  }

  ngOnDestroy() {
    clearInterval(this.intervalKey);
  }
  ngOnInit() {
    //every 3 seconds check if the remote server opened
    this.intervalKey = setInterval(() => {

       this.http.get(this.getServerUrl(),{responseType:"text"})
        .subscribe((res) => {
          if (res.toString().includes("<html>")) {
            this.isRemoteServerOpen = true;
          } else {
            this.isRemoteServerOpen = false;
          }
        }, (err) => {
          if (err) {
            this.isRemoteServerOpen = false;
            console.log("http://"+ this.address + ':12345/');
            console.log(err)
            }
        });
        this.detector.detectChanges();
    }, 1000);

  }
}
