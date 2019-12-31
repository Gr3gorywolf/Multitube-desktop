import { Component, OnInit } from '@angular/core';
import { TcpService } from 'src/app/services/tcp.service';
declare var $:any;
@Component({
  selector: 'app-connected-clients',
  templateUrl: './connected-clients.component.html',
  styleUrls: ['./connected-clients.component.css']
})
export class ConnectedClientsComponent implements OnInit {

  constructor(public tcp:TcpService) { }

  ngOnInit() {
    $(document).ready(()=>{
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });

  }
  openModal(){
    $('#modal1').modal('open');

  }
}
