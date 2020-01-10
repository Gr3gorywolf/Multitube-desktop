import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TcpService } from 'src/app/services/tcp.service';
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-connected-clients',
  templateUrl: './connected-clients.component.html',
  styleUrls: ['./connected-clients.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectedClientsComponent implements OnInit, OnDestroy {

  constructor(public tcp: TcpService, public http: HttpClient, private detect: ChangeDetectorRef) { }
  intervalKey: any;
  ngOnInit() {
    $(document).ready(() => {
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered

      $('#infoModal').detach().appendTo('body');
      $('#infoModal').modal();
    });
    this.intervalKey = setInterval(() => {
      this.detect.markForCheck();
   }, 1500);

  }
  ngOnDestroy() {
    $('#infoModal').remove();
    clearInterval(this.intervalKey);

  }

  getCleanAddress(dirtyAddress: string) {
   return dirtyAddress.replace('::ffff:', '');

  }



  openModal() {
    $('#infoModal').modal('open');
    $('#infoModal').css('position', 'fixed');
    $('#infoModal').css('z-index', '500');
    $('.modal-overlay').css('z-index', '455');

  }
}
