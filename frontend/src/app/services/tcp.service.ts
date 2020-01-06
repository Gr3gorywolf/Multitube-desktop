import { Injectable, NgZone } from '@angular/core';
import { PlaybackserviceService } from './playbackservice.service';
import { toast } from 'angular2-materialize';
import { Socket, Server } from 'net';
import { ElectronService } from 'ngx-electron';
import { AsyncHelper } from '../Utils/AsyncHelper';
import { UrlHelper } from '../Utils/UrlHelper';
import { Router, NavigationStart } from '@angular/router';
import { TcpClientStatus } from '../models/TcpClientStatus';
import { Remote } from 'electron';
import { DownloadService } from './download.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TcpService {


  private electronInstance: Remote;
  private clientsListCount = 0;
  private hostName = "Multitube server";
  private volumeState = "vol100()"
  private clientsCurrentElementUrl = '';
  private clientsCurrentLoadingState: boolean = false;
  private tcp: any;
  public server: Server;
  public connectedClients: Array<Socket> = [];
  public clientsStatuses: Map<Socket, TcpClientStatus> = new Map();
  public currentIp = '';
  constructor(
    private play: PlaybackserviceService
    , private zone: NgZone
    , private electron: ElectronService
    , private route: Router,
    private download: DownloadService,
    private notification: NotificationService) {
    this.electronInstance = this.electron.remote;
    this.tcp = this.electronInstance.require('net');
    this.hostName = this.electronInstance.require('os').hostname();
  }




  //tries to get the most acurate ip
  private getIp() {
    try {
      this.currentIp = this.electronInstance.require('ip').address("Ethernet");
    } catch (ex) {
      try {
        this.currentIp = this.electronInstance.require('ip').address("Wlan0");
      } catch (exep) {
        this.currentIp = this.electronInstance.require('ip').address();
      }

    }

  }

  initServer() {
    this.server = this.tcp.createServer((socket: Socket) => {
      if (socket.remoteAddress != undefined) {
        this.connectedClients.push(socket);
        this.clientsStatuses.set(socket, {
          isAdding: false,
          isDeleting: false,
          isDownloading: false,
          isRequesting: false
        } as TcpClientStatus)
      }

      socket.on('error', (err: any) => {
        if (err.code !== 'ECONNRESET') {

        }
        this.zone.run(() => {
          this.connectedClients.splice(this.connectedClients.indexOf(socket), 1);
        })

      });

      socket.on('end', () => {
        this.zone.run(() => {
          this.connectedClients.splice(this.connectedClients.indexOf(socket), 1);
        })
      });
      socket.on('data', (buff: Buffer) => {
        this.zone.run(() => {
          this.handleQuery(buff, socket);
        });

      });

    });
    this.server.listen(1024);
    this.getIp();


    // verify if changed something in a list to emit to the client
    setInterval(() => {
      if (this.play.info != null) {
        if (this.clientsCurrentElementUrl !== this.play.info.video_url
          || this.clientsListCount !== this.play.quenue.length
          || this.clientsCurrentLoadingState !== this.play.isLoading) {
          this.clientsCurrentElementUrl = this.play.info.video_url;
          this.clientsListCount = this.play.quenue.length;
          this.clientsCurrentLoadingState = this.play.isLoading;
          this.updateClientsData();

        }
      }
    }, 100);
  }




  handleQuery(query: Buffer, socket: Socket) {


    let status = this.clientsStatuses.get(socket);
    switch (query.toString()) {
      case 'playpause()':
        this.play.playerInstance.togglePlay();
        break;
      case 'pedirindice()':
        if (status.isRequesting === false) {
          status.isRequesting = true;
        }
        break;
      case 'eliminarelemento()':
        if (status.isRequesting === false) {
          status.isDeleting = true;
        }
        break;
      case 'agregar()':
        status.isAdding = true;
        break;
      case 'actual-()':
        this.play.playerInstance.rewind();
        break;
      case 'actual+()':
        this.play.playerInstance.forward();
        break;
      case 'recall()':
        toast('Nuevo cliente conectado!!', 1000);
        if (this.play.info != null) {
          this.updateClientData(socket);
        }
        this.notification.notify("Nuevo cliente conectado", "Se ha conectado un nuevo cliente al servidor");
        break;
      case 'vol0()':
        this.volumeState = query.toString();
        this.play.playerInstance.volume = 0;
        this.updateClientsData();
        break;
      case 'vol50()':
        this.volumeState = query.toString();
        this.play.playerInstance.volume = 0.5;
        this.updateClientsData();
        break
      case 'vol100()':
        this.volumeState = query.toString();
        this.play.playerInstance.volume = 1;
        this.updateClientsData();
      case 'back()':
        this.play.playPrevious();
        break;
      case 'next()':
        this.play.playNext();
        break;
      case 'fullscreen()':
        this.play.toggleFullscreen();
        break
      /////special actions like download,add etc
      default:
        status = this.manageSpecialActions(query.toString(), status);
        break;

    }
    console.log(query.toString());
    console.log(query.toString() === 'fullscreen()');
    this.clientsStatuses.set(socket, status);

  }





  private manageSpecialActions(query: string, status: TcpClientStatus): TcpClientStatus {

    //download status action
    if (this.play.info != null && query.toString().includes("desc")) {
      if (query.toString() == "descvid360()") {
        this.download.quenueDownload(this.play.info.video_url, "360p");
      }
      else
        if (query.toString() == "descvid720()") {
          this.download.quenueDownload(this.play.info.video_url, "720p");
        }
        else
          if (query.toString() == "descmp3()") {
            this.download.quenueDownload(this.play.info.video_url, null);
          }
    }
    else
      //requesting status action
      if (status.isRequesting) {
        if (parseInt(query.toString()) >= 0) {
          this.play.loadVideo(this.play.quenue[parseInt(query.toString())].url);
        }
        status.isRequesting = false;
      }
      else
        ///deleting status action
        if (status.isDeleting === true) {

          const index = parseInt(query.toString());
          if (index >= 0) {

            this.notification.notifyByPlayItem("Eliminado de la cola", this.play.quenue[index]);
            this.play.removeFromQueue(this.play.quenue[index]);

          }
          status.isDeleting = false;
        }
        else
          //without status (play) action
          if (query.toString().includes('youtube.com')) {
            if (status.isAdding) {
              if (this.play.quenue.length == 0) {
                this.play.loadVideo(query.toString());
              }
              else {
                this.play.addToQuenueByUrl(query.toString());
              }
              status.isAdding = false;
            }
            else {
              this.play.loadVideo(query.toString());
            }
          }
    return status;
  }





  public async updateClientsData() {
    for (const cli of this.connectedClients) {
      this.updateClientData(cli);
    }
  }

  public async updateClientData(sock: Socket) {

    const helper = new AsyncHelper();
    const thumbnail = new UrlHelper().getThumbnailFromUrl(this.play.info.video_url);
    const title = this.play.info.title;
    const url = this.play.info.video_url;
    let names = [];
    let urls = [];
    for (var quen of this.play.quenue) {
      names.push(quen.title);
      urls.push(quen.url);
    }
    console.log("urls-->" + urls);
    console.log("names-->" + names)
    var jsonFront = JSON.stringify([
      thumbnail,
      title,
      url,
      this.volumeState,
      this.clientsCurrentLoadingState,
      this.hostName


    ]);
    sock.write(`[%%CARATULA%%]${jsonFront}[%%LINKS%%]${JSON.stringify(urls)}[%%TITLES%%]${JSON.stringify(names)}`)
  }


}
