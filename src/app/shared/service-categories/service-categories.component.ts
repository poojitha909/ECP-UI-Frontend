import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JdCategoryService } from 'src/app/core/services';
import { Category, categorySources } from 'src/app/core/interfaces';

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

  constructor() {

  }

  ngOnInit() {

  }

  clearSelection() {
    this.onClearSelection.emit();
  }

  onCategoryChanged(ParentCatid: string, catId: string, source: categorySources[]) {

    if (source && source.length > 1) {
      catId = `${source[0].catid},${source[1].catid}`;
    }
    const selectedData = {
      ParentCatid: ParentCatid,
      catId: catId
    }
    this.onCategoryChange.emit(selectedData);
  }


}
