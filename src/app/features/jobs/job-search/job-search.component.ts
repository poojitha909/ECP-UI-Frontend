import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {
  activeJob
  location:{
    cid: any,
    country: any,
    countryID: any,
    engKeyID: any,
    esiApplicable: any,
    isMetro: any,
    locationTitle: any,
    ptApplicable: any,
    rid: any,
    state: any,
    stateID: any,
  }
  jobSearchKey = ""
  locationList: {
    cid: any,
    country: any,
    countryID: any,
    engKeyID: any,
    esiApplicable: any,
    isMetro: any,
    locationTitle: any,
    ptApplicable: any,
    rid: any,
    state: any,
    stateID: any,
  }[] = []

  jobList = []
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }



  public getLocations(location) {
    if (location.term.length > 2) {
      this.http.post<any>("https://prodapi.staffinggo.in/api/Master/GetLocationListOnSearch", {
        "cid": 2003, "languageType": 0, "userID": 9999, "searchKey": location.term
      }).subscribe(res => {
        this.locationList = res.dataObject
      })
    }
  }


  public searchJobs() {
    console.log(this.location, this.jobSearchKey);
    if(this.location.rid!= undefined)
    this.http.post<any>("https://prodapi.staffinggo.in/api/CSS/Consultant/GetPostedRequirementList",
      {
        "cid": 2003,
        "sourceID": 42520,
        "sourcingAgencyID": 0,
        "userIP": "",
        "dataFilter": [
          // {
          //   "filterDataType": 3,
          //   "filterColumnName": "Experience",
          //   "filterVal": 0,
          //   "filterText": null,
          //   "filterIDs": null,
          //   "filterDates": null,
          //   "filterDecimals": [
          //     1,
          //     3
          //   ]
          // },
          // {
          //   "filterDataType": 2,
          //   "filterColumnName": "PostedDate",
          //   "filterVal": 0,
          //   "filterText": null,
          //   "filterIDs": null,
          //   "filterDates": [
          //     "20-Nov-2020",
          //     "27-Nov-2020"
          //   ],
          //   "filterDecimals": null
          // },
          {
            "filterDataType": 0,
            "filterColumnName": "Keywords",
            "filterVal": 0,
            "filterText": [
              this.jobSearchKey
            ],
            "filterIDs": null,
            "filterDates": null,
            "filterDecimals": null
          },
          {
            "filterDataType": 1,
            "filterColumnName": "Location",
            "filterVal": 0,
            "filterText": null,
            "filterIDs": [
              this.location.rid
            ],
            "filterDates": null,
            "filterDecimals": null
          }
        ]
      }
    ).subscribe(res => {
      this.jobList = res.dataObject
    })
  }

  public getJobDetail() {
    this.http.post<any>("https://prodapi.staffinggo.in/api/CSS/Consultant/GetPostedRequirementDetails", {
      "cid": 2003, "languageType": 0, "userID": 9999, "searchKey": location
    }).subscribe(res => {
      this.locationList = res.dataObject
    })
  }

}
