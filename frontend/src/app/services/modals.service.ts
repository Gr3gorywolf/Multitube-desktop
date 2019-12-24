import { Injectable } from '@angular/core';
import { AnimationsHelper } from '../Utils/animationsHelper';
import { PlayListItem } from '../models/PlaylistItem';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  animationHelper:AnimationsHelper = new AnimationsHelper();
  public selectedItem:PlayListItem;
  constructor() { }

 public OpenAboutModal(){
    let modal:any  = document.getElementById("modal");
    let shadow:any = document.getElementById("shadow");
    this.animationHelper.Animate('bounceInUp', modal)
    document.body.style.overflowY = 'hidden';
    modal.style.display = 'initial';
    shadow.style.display = 'initial';
    modal.focus();
  }
 public CloseAboutModal(){
    let modal:any  = document.getElementById("modal");
    let shadow:any = document.getElementById("shadow");
    this.animationHelper.AnimateWithCallback('bounceOutDown', modal, function () {
      if ((window.outerWidth <= 995)) {
          document.body.style.overflowY = 'auto';
      }
      modal.style.display = 'none';
      shadow.style.display = 'none';
  })
  }


  public OpenActionsModal(){
    let modal:any  = document.getElementById("modal4");
    let shadow:any = document.getElementById("shadow4");
    this.animationHelper.Animate('bounceInUp', modal)
    document.body.style.overflowY = 'hidden';
    modal.style.display = 'initial';
    shadow.style.display = 'initial';
    modal.focus();
  }
 public CloseActionsModal(){
    let modal:any  = document.getElementById("modal4");
    let shadow:any = document.getElementById("shadow4");
    this.animationHelper.AnimateWithCallback('bounceOutDown', modal, function () {
      if ((window.outerWidth <= 995)) {
          document.body.style.overflowY = 'auto';
      }
      modal.style.display = 'none';
      shadow.style.display = 'none';
  })
  }


}
