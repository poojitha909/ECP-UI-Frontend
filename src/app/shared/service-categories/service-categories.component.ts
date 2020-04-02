import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JdCategoryService } from 'src/app/core/services';
import { Category } from 'src/app/core/interfaces';

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.scss']
})
export class ServiceCategoriesComponent implements OnInit {

  @Input() selectedCategoryType: Category;
  @Input() selectedCategory: string;
  @Output() onCategoryChange: EventEmitter<any> = new EventEmitter();
  @Output() onClearSelection: EventEmitter<any> = new EventEmitter();

  categories: Category[];

  constructor(private jdCategoryService: JdCategoryService) {
    this.categories = jdCategoryService.serviceCategories;
  }

  ngOnInit() {
  }

  clearSelection() {
    this.onClearSelection.emit();
  }

  onCategoryChanged(catName: string, catId: string) {
    const selectedData = {
      catName: catName,
      catId: catId
    }
    this.onCategoryChange.emit(selectedData);
  }


}
