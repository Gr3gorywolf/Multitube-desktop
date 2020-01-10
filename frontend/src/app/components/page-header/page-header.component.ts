import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css' ]

})
export class PageHeaderComponent implements OnInit {
  @Input() icon:string;
  @Input() title:string;
  constructor() { }

  ngOnInit() {
  }

}
