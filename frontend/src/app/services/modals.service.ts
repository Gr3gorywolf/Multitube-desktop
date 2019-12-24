import { Injectable } from '@angular/core';
import { AnimationsHelper } from '../Utils/animationsHelper';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  animationHelper:AnimationsHelper = new AnimationsHelper();
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
      if (!(window.outerWidth >= 995)) {
          document.body.style.overflowY = 'auto';
      }
      modal.style.display = 'none';
      shadow.style.display = 'none';
  })
  document.getElementById('#putita').focus();
  }

}
