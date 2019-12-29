import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'frontend';

    constructor(public routing:Router){

    }

    isOnIndex(){
     return this.routing.url == "/"
    }
}
