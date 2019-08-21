import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DiscussionService} from '../../services/discussion.service';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-discussion-create-page',
  templateUrl: './discussion-create-page.component.html',
  styleUrls: ['./discussion-create-page.component.scss']
})
export class DiscussionCreatePageComponent implements OnInit {
  discussId: string;
  selCategory: string;
  categoryList: any[];
  title: string;
  description: string;


  constructor(private route:ActivatedRoute,private discussionService: DiscussionService, private menuService: MenuService) { }
  
  ngOnInit() {
    this.title = "";
    this.description = "";
    this.selCategory = "";
    this.discussId = this.route.snapshot.params['id'];
    this.selCategory = "";
    this.menuService.getMenus("564071623e60f5b66f62df27").subscribe( (response:any) =>{
      const data = response;
      this.categoryList = [];
      if(data.length > 0){
        for(let i in data){
          this.categoryList[ data[i].id ] = {id: data[i].id, label: data[i].displayMenuName, tags:[]};
          if(data[i].tags){
            this.categoryList[ data[i].id ].tags = data[i].tags;
          }
        }
      }
      // this.discussionService.addDiscussion("Q",
      // description,
      // title,
      // "123",
      // "username 123",
      // this.categoryList[ this.selCategory ].tags
      // ,[this.categoryList[ this.selCategory ].id],
      // 0);
    });
  }

  onCategorySelect(value){
    this.selCategory = value;
  }

  onReset(){
    this.title = "";
    this.description = "";
    this.selCategory = "";
  }
  
  onSubmit(){
    if(this.selCategory != "" && this.title!= "" && this.description!= ""){
      this.discussionService.addDiscussion("Q", this.description, this.title, "123", "username 123", 
            this.categoryList[ this.selCategory ].tags
            ,[ this.categoryList[ this.selCategory ].id ],
            0)
        .subscribe( (response) => {
          console.log(response);
        });
    }
    else{
      alert("All fileds are required, please fill all fields.");
    }
  }
}