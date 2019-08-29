import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DiscussionService} from '../../services/discussion.service';
import {MenuService} from '../../services/menu.service';
import {Router} from "@angular/router";
import {StorageHelperService} from "../../../../core/services/storage-helper.service";
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
  user: any;


  constructor(private route:ActivatedRoute,private router: Router, private discussionService: DiscussionService, private menuService: MenuService, private store: StorageHelperService) { }
  
  ngOnInit() {
    this.title = "";
    this.description = "";
    this.selCategory = "";
    this.discussId = this.route.snapshot.params['id'];
    this.selCategory = "";
    this.user = this.store.retrieve("ECP-USER");
    if(this.user){
      this.user = JSON.parse(this.user);
    }
    let discuss = this.store.retrieve("new-discuss");
    if(discuss){
      discuss = JSON.parse(discuss); 
      this.title = discuss.title;
      this.description = discuss.description;
      this.selCategory = discuss.selCategory;
      this.discussId = discuss.discussId;
      this.store.clear("new-discuss");
    }
    this.menuService.getMenus("564071623e60f5b66f62df27","").subscribe( (response:any) =>{
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
    if(!this.user){
      this.store.store("new-discuss",JSON.stringify({title: this.title, description: this.description, selCategory : this.selCategory,discussId: this.discussId}));
      this.router.navigate(['/user/signin']);
      return;
    }

    if(this.selCategory != "" && this.title!= "" && this.description!= ""){
      this.discussionService.addDiscussion("P", this.description, this.title, this.user.id, this.user.userName, 
            this.categoryList[ this.selCategory ].tags
            ,[ this.categoryList[ this.selCategory ].id ],
            0)
        .subscribe( (response:any) => {
          if(response.data.id != ""){
            this.router.navigate(['/community/discussion', response.data.id]);
          }
          else{
            alert("Oops! something wrong happen, please try again.");            
          }
        });
    }
    else{
      alert("All fields are required, please fill all fields.");
    }
  }
}