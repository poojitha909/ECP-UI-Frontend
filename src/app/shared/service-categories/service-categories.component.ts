import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JdCategoryService } from 'src/app/core/services';
import { Category, categorySources } from 'src/app/core/interfaces';
import { HomeService } from 'src/app/features/home/home.service';

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.scss']
})
export class ServiceCategoriesComponent implements OnInit {

  @Input() categories: Category[];
  @Input() selectedCategoryType: Category;
  @Input() selectedCategory: string;
  @Output() onCategoryChange: EventEmitter<any> = new EventEmitter();
  @Output() onClearSelection: EventEmitter<any> = new EventEmitter();

  // categories: Category[];

  constructor(private homeService: HomeService) {

  }

  ngOnInit() {

  }

  clearSelection() {
    this.onClearSelection.emit();
    this.homeService.serviceCategory = "";
    this.homeService.serviceSubCategory = "";
  }

  onCategoryChanged(ParentCatid: string, catId: string) {
    this.homeService.serviceCategory = ParentCatid;
    this.homeService.serviceSubCategory = catId;
    const selectedData = {
      ParentCatid: ParentCatid,
      catId: catId
    }
    this.onCategoryChange.emit(selectedData);
  }


}
