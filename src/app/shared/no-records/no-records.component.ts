import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from 'src/app/features/home/home.service';

@Component({
  selector: 'app-no-records',
  templateUrl: './no-records.component.html',
  styleUrls: ['./no-records.component.scss']
})
export class NoRecordsComponent implements OnInit {

  constructor(public homeService:HomeService) { }

  ngOnInit() {
  }


}
