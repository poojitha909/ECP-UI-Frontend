import { Component, OnInit, Input } from '@angular/core';
import { EpcServiceService } from '../../epc-service.service';

@Component({
  selector: 'app-no-records',
  templateUrl: './no-records.component.html',
  styleUrls: ['./no-records.component.scss']
})
export class NoRecordsComponent implements OnInit {

  constructor(public ecpService: EpcServiceService) { }

  ngOnInit() {
  }


}
