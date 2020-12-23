import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {
  activeJob
  location: {
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
  isApplyClicked = false
  isJobNotFound = false
  jobList = []
  isAppliedWithoutJob = false
  errorText = ''
  openApply = false;
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
    this.openApply = false;
    this.isAppliedWithoutJob = false;
    let req;
    if (this.location != undefined) {
      req = {
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
    }
    else {
      req = {
        "cid": 2003,
        "sourceID": 42520,
        "sourcingAgencyID": 0,
        "userIP": "",
        "dataFilter": [
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
          }
        ]
      }
    }

    this.http.post<any>("https://prodapi.staffinggo.in/api/CSS/Consultant/GetPostedRequirementList",
      req
    ).subscribe(res => {
      this.jobList = res.dataObject
      if (res.dataObject == undefined || res.dataObject == null) {
        this.isJobNotFound = true;

      } else {
        this.isJobNotFound = false;
      }
    })
  }

  public getJobDetail() {
    this.http.post<any>("https://prodapi.staffinggo.in/api/CSS/Consultant/GetPostedRequirementDetails", {
      "cid": 2003, "languageType": 0, "userID": 9999, "searchKey": location
    }).subscribe(res => {
      this.locationList = res.dataObject
    })
  }
  firstName = '';
  lastName = '';
  emailID = '';
  mobileNo = '';
  dob = '';
  resumeFileName = '';
  resumeDocumentB64 = '';
  public applyForJob(reqId = 0) {
    if (this.firstName == '') {
      this.errorText = 'Enter First Name!';
    } else if (this.lastName == '') {
      this.errorText = 'Enter Last Name!';
    } else if (this.dob == '') {
      this.errorText = 'Enter Date of Birth!';
    } else if (this.emailID == '') {
      this.errorText = 'Enter Email ID!';
    } else if (this.mobileNo == '') {
      this.errorText = 'Enter Mobile Number!';
    } else if (this.resumeDocumentB64 == '') {
      this.errorText = 'Upload Resume!';
    } else {
      this.http.post<any>("https://prodapi.staffinggo.in/api/CSS/Consultant/ApplyForPostedRequirement",
        {
          "cid": 2003,
          "reqID": reqId,
          "sourceID": 42520,
          "sourcingAgencyID": 0,
          "firstName": this.firstName,
          "lastName": this.lastName,
          "emailID": this.emailID,
          "mobileNo": this.mobileNo,
          "dob": this.dob,
          "resumeFileName": this.resumeFileName,
          "resumeDocument": this.resumeDocumentB64,
          "presentCTCCurrencyID": 1,
          "presentCTC": 200000,
          "presentCTCFrequencyID": 6,
          "expectedCTCCurrencyID": 1,
          "expectedCTC": 300000,
          "expectedCTCFrequencyID": 6,
          "noticePeriod": "15",
          "userIP": "103.6.158.211"
        }).subscribe(res => {

          this.isApplyClicked = false
          if (reqId == 0) {
            this.isAppliedWithoutJob = true;
          } else {
            this.activeJob['isApplied'] = true
          }
        })
    }
  }

  onSelectFile(event) {

    let isAllSizeValid = true;

    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        if (((event.target.files[i].size / 1024) / 1024) > 5) {
          isAllSizeValid = false;
        }
      }
    }
    if (isAllSizeValid == true) {
      if (event.target.files && event.target.files[0]) {
        for (let i = 0; i < event.target.files.length; i++) {
          var reader = new FileReader();
          reader.onload = (event: any) => {
            this.resumeDocumentB64 = event.target.result;
          }
          reader.readAsDataURL(event.target.files[i]);
        }
      }
    } else {
      this.errorText = "Resume size should not be greater than 5MB"
    }
  }

}
