import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getLocations('Bangalore').subscribe(res=>{})
  }



  public getLocations(location) {
    return this.http.post("https://prodapi.staffinggo.in/api/Master/GetLocationListOnSearch", {
        "cid": 2003, "languageType": 0, "userID": 9999, "searchKey": location
    });
}

}
