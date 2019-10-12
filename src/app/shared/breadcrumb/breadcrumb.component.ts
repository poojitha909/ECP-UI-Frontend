import { Component, OnInit, Input } from '@angular/core';
import { Breadcrumb } from 'src/app/core/interfaces';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() breadcrumbLinks: Breadcrumb[];

  constructor() { }

  ngOnInit() {
    console.log(this.breadcrumbLinks);
  }

}
