import { Injectable, NgZone } from '@angular/core';
import { PlaybackserviceService } from './playbackservice.service';
import { toast } from 'angular2-materialize';
import { Socket, Server } from 'net';
import { ElectronService } from 'ngx-electron';
import { AsyncHelper } from '../Utils/AsyncHelper';
import { UrlHelper } from '../Utils/UrlHelper';
import { Router, NavigationStart } from '@angular/router';
import { TcpClientStatus } from '../models/TcpClientStatus';

@Injectable({
  providedIn: 'root'
})
export class TcpService {


  private electronInstance: any;
  private clientsListCount = 0;
  private hostName = "Multitube server";
  private volumeState = "vol100()"
  private clientsCurrentElementUrl = '';
  private clientsCurrentLoadingState:boolean = false;
  private tcp: any;
  public server: Server;
  public connectedClients: Array<Socket> = [];
  public clientsStatuses:Map<Socket,TcpClientStatus> = new Map();
  public currentIp = '';
  constructor(
    private play: PlaybackserviceService
    , private zone: NgZone
    , private electron: ElectronService
    ,private route:Router) {
    this.electronInstance = this.electron.remote;
    this.tcp = this.electronInstance.require('net');
    this.hostName = this.electronInstance.require('os').hostname();
  }





  initServer() {
   this.server = this.tcp.createServer((socket: Socket) => {
        if(socket.remoteAddress != undefined){
        this.connectedClients.push(socket);
        this.clientsStatuses.set(socket,{
           isAdding : false,
           isDeleting : false,
           isDownloading : false,
           isRequesting : false
        } as TcpClientStatus)
      }

        socket.on('error', (err:any) =>{
          if (err.code !== 'ECONNRESET') {

        }
        this.zone.run(()=>{
          this.connectedClients.splice( this.connectedClients.indexOf(socket), 1);
        })

        });

        socket.on('end', () =>{
          this.zone.run(()=>{
            this.connectedClients.splice( this.connectedClients.indexOf(socket), 1);
          })
      });
        socket.on('data', (buff: Buffer) => {
         this.zone.run(() => {
            this.handleQuery(buff,socket);
          });

        });

   });
   this.server.listen(1024);
   this.currentIp = this.electronInstance.require('ip').address('Ethernet');


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




  handleQuery(query: Buffer,socket:Socket) {


    let status = this.clientsStatuses.get(socket);
    if (query.toString() === 'playpause()') {
      this.play.playerInstance.togglePlay();

    } else
    if (status.isDownloading) {
      /* var quality = '';
       if (query.toString().split('³')[1] == '0') {
         quality = null
       } else {
          quality = query.toString().split('³')[1]
       }
       descargar(query.toString().split('³')[0], ".", quality);
       this.isDownloading = false;*/
    } else
    if (query.toString() === 'fullscreen()') {


    } else
    if (status.isRequesting) {
      if (parseInt(query.toString()) >= 0) {
        this.play.loadVideo(this.play.quenue[parseInt(query.toString())].url);
      }

    } else

    if (status.isDeleting === true) {

      const index = parseInt(query.toString());
      if (index >= 0) {
        this.play.removeFromQueue(this.play.quenue[index]);
      }
      status.isDeleting = false;
    } else
    if (query.toString().includes('youtube.com')) {
      if (status.isAdding) {
          if (this.play.quenue.length == 0) {
            this.play.loadVideo(query.toString());
          } else {
            this.play.addToQuenueByUrl(query.toString());
         }
         status.isAdding = false;
      } else {
        this.play.loadVideo(query.toString());
      }
    } else
    if (query.toString() === 'descargar()') {

      status.isDownloading = true;

    } else
    if (query.toString() === 'pedirindice()' && status.isRequesting === false) {
      status.isRequesting = true;
    } else
    if (query.toString() === 'eliminarelemento()' && status.isRequesting === false) {
      status.isDeleting = true;
    } else
    if (query.toString() === 'agregar()') {
      status.isAdding = true;
    } else
    if (query.toString() === 'actual+()') {
      this.play.playerInstance.forward();
    } else
    if (query.toString() === 'actual-()') {
      this.play.playerInstance.rewind();
    } else
    if (query.toString() === 'recall()') {
      toast('Nuevo cliente conectado!!', 1000);
      if (this.play.info != null) {
        this.updateClientData(socket);
      }
    } else
    if (query.toString() === 'vol0()') {
      this.volumeState = query.toString();
      this.play.playerInstance.volume = 0;
      this.updateClientsData();
    } else
    if (query.toString() === 'vol50()') {
      this.volumeState = query.toString();
      this.play.playerInstance.volume = 0.5;
      this.updateClientsData();
    }else
    if (query.toString() === 'vol100()') {
      this.volumeState = query.toString();
      this.play.playerInstance.volume = 1;
      this.updateClientsData();
    }else
    if (query.toString() === 'back()') {
      this.play.playPrevious();

    }else
    if (query.toString() === 'next()') {
      this.play.playNext();
    }
    else
    if (query.toString() === 'fullscreen()') {
      this.play.toggleFullscreen();
    }
    this.clientsStatuses.set(socket,status);

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
    let  urls = [];
    for(var quen of this.play.quenue){
        names.push(quen.title);
        urls.push(quen.url);
    }
    console.log("urls-->"+urls);
    console.log("names-->"+names)
    var jsonFront =JSON.stringify([
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
