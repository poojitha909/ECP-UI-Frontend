import { Component, OnInit, Input } from '@angular/core';
import { StorageHelperService } from 'src/app/core/services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  @Input() searchData: any;
  @Input() term: string;

  constructor(private storageHelper: StorageHelperService) { }

  ngOnInit() {
  }

  clearSearchSession() {
    this.storageHelper.clearSession('homeSearchText');
  }

}
