import { Injectable } from '@angular/core';
import { AnimationsHelper } from '../Utils/animationsHelper';
import { PlayListItem } from '../models/PlaylistItem';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  animationHelper: AnimationsHelper = new AnimationsHelper();
  public selectedItem: PlayListItem;
  constructor() { }

  public OpenAboutModal() {
    this.openModal("modal","shadow");
  }

  public CloseAboutModal() {
    this.closeModal("modal","shadow");
  }

  public OpenActionsModal() {
    this.openModal("modal4","shadow4");
  }

  public CloseActionsModal() {
    this.closeModal("modal4","shadow4");
  }

  public OpenDownloadModal() {
   this.openModal("modal3","shadow3");
  }

  public CloseDownloadModal() {
    this.closeModal("modal3","shadow3");
  }



  private openModal(modalId: string, shadowId: string) {
    let modal: any = document.getElementById(modalId);
    let shadow: any = document.getElementById(shadowId);
    console.log(modal);
    this.animationHelper.Animate('bounceInUp', modal)
    document.body.style.overflowY = 'hidden';
    modal.style.display = 'initial';
    shadow.style.display = 'initial';
    modal.focus();
  }
  private closeModal(modalId: string, shadowId: string) {
    let modal: any = document.getElementById(modalId);
    let shadow: any = document.getElementById(shadowId);
    this.animationHelper.AnimateWithCallback('bounceOutDown', modal, function () {
      if ((window.outerWidth <= 995)) {
        document.body.style.overflowY = 'auto';
      }
      modal.style.display = 'none';
      shadow.style.display = 'none';
    })
  }


}
