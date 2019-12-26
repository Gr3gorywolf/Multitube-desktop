export class OverflowHelper{

  public toggleOverflow() {
    if (window.outerWidth >= 995) {
      window.scrollTo(0, 0);
      if (document.body.style.overflowY != 'hidden') {

        document.body.style.overflowY = 'hidden';
      }
    } else {
      if (document.body.style.overflowY != 'auto') {

        document.body.style.overflowY = 'auto';
      }
    }
  }

}
