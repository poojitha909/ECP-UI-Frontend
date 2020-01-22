import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { JdCategoryService } from 'src/app/core/services';

@Injectable()
export class CategoryResolverService implements Resolve<any> {
  constructor(private jdCategoryService: JdCategoryService) { }

  resolve() {
    return this.jdCategoryService.fetchAllCategories();
  }
}
