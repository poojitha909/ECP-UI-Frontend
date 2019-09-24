import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JDCategory } from '../interfaces';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api.constants';

@Injectable({
  providedIn: 'root'
})
export class JdCategoryService {

  private allCategories: JDCategory[] = [];
  constructor(private http: HttpClient) { }

  get categories(): JDCategory[] {
    return this.allCategories
  }

  fetchAllCategories() {
    this.http.get<JDCategory[]>(`${ApiConstants.GET_JD_CATEGORIES}`).subscribe(
      response => {
        if (response) {
          this.allCategories = response;
          this.allCategories.forEach(val => {
            if (val.category_name.startsWith('24')) {
              val.class = ['bg-card-peach'];
              val.icon = ['fas', 'history']
            } else if (val.category_name.startsWith('Ambulance')) {

              val.class = ['bg-card-yellow'];
              val.icon = ['fas', 'ambulance']


            } else if (val.category_name.startsWith('Ayurvedic')) {

              val.class = ['bg-card-green'];
              val.icon = ['fas', 'user-md']

            } else if (val.category_name.startsWith('Chemists')) {

              val.class = ['bg-card-yellow'];
              val.icon = ['fas', 'file-prescription']

            } else if (val.category_name.startsWith('Clinics') || val.category_name.startsWith('Dentists') || val.category_name.startsWith('Homeopathic')) {

              val.class = ['bg-card-peach'];
              val.icon = ['fas', 'user-md']

            } else if (val.category_name.startsWith('Taxi') || val.category_name.startsWith('Driver')) {

              val.class = ['bg-card-yellow'];
              val.icon = ['fas', 'taxi']

            } else if (val.category_name.startsWith('Financial')) {

              val.class = ['bg-card-peach'];
              val.icon = ['fas', 'comments-dollar']

            } else if (val.category_name.startsWith('Home') || val.category_name.startsWith('House') || val.category_name.startsWith('Residential')) {

              val.class = ['bg-card-peach'];
              val.icon = ['fas', 'home']

            } else if (val.category_name.startsWith('Hospitals')) {

              val.class = ['bg-card-yellow'];
              val.icon = ['fas', 'hospital']

            } else if (val.category_name.startsWith('Medical')) {

              val.class = ['bg-card-green'];
              val.icon = ['fas', 'pills']

            } else if (val.category_name.startsWith('Fitness')) {

              val.class = ['bg-card-peach'];
              val.icon = ['fas', 'heartbeat']
            } else if (val.category_name.startsWith('Nurse')) {

              val.class = ['bg-card-peach'];
              val.icon = ['fas', 'user-nurse']

            } else if (val.category_name.startsWith('Legal') || val.category_name.startsWith('Lawyers')) {

              val.class = ['bg-card-yellow'];
              val.icon = ['fas', 'balance-scale']

            } else {
              val.class = ['bg-card-green'];
              val.icon = ['fas', 'hand-holding-heart']
            }
          })
        }
      });
  }
}
