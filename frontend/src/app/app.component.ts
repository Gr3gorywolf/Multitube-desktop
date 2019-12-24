import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'frontend';

  ngAfterViewInit(){

    window.addEventListener('resize', function (event) {
      // do stuff here
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


  });
  }
}
