import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../../services/discussion.service';
import { MenuService } from '../../services/menu.service';
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { Breadcrumb } from 'src/app/core/interfaces';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-discussion-create-page',
  templateUrl: './discussion-create-page.component.html',
  styleUrls: ['./discussion-create-page.component.scss']
})
export class DiscussionCreatePageComponent implements OnInit {
  breadcrumbLinks: Breadcrumb[] = [
    {
      text: 'Home',
      link: '/'
    },
    {
      text: 'Engage with us',
      link: '/community'
    },
    {
      text: 'Articles & Discussions',
      link: '/community'
    }
  ];

  discussId: string;
  categoryList: any[];
  discussForm: FormGroup;
  user: any;


  constructor(private route: ActivatedRoute, private router: Router, 
    private discussionService: DiscussionService, private menuService: MenuService,
    private store: StorageHelperService, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.discussId = this.route.snapshot.params['id'];
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    let discuss = this.store.retrieve("new-discuss");
    if (discuss) {
      discuss = JSON.parse(discuss);
      this.discussId = discuss.discussId;
      this.store.clear("new-discuss");
    }
    this.discussForm = this.fb.group({
      title:  [discuss ? discuss.title : "", Validators.required],
      description:  [discuss ? discuss.description : "", Validators.required],
      category: [discuss && discuss.category ? discuss.category : ""]
    });
    this.menuService.getMenus("564071623e60f5b66f62df27", "").subscribe((response: any) => {
      const data = response;
      this.categoryList = [];
      if (data.length > 0) {
        for (let i in data) {
          this.categoryList[data[i].id] = { id: data[i].id, label: data[i].displayMenuName, tags: [] };
          if (data[i].tags) {
            this.categoryList[data[i].id].tags = data[i].tags;
          }
        }
      }
    });
  }

  get formControl() {
    return this.discussForm.controls;
  }

  onReset() {
    this.discussForm.reset();
    this.router.navigate(['/community']);
  }

  onSubmit() {
    let discuss = null;
    
    discuss = { ...this.discussForm.value };
    discuss.discussId = this.discussId;
    this.store.store("new-discuss", JSON.stringify(discuss));
    if(!this.user) {
      this.authService.redirectUrl = "community/discussion/add";
      this.router.navigate(['/user/signin']);
      return;
    }

    Object.keys(this.discussForm.controls).forEach(field => {
      const control = this.discussForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (!this.discussForm.valid) {
      return;
    }
    
    this.store.store("new-discuss-preview", JSON.stringify({
      description: discuss.description,
      title: discuss.title,
      userId: this.user.id,
      userName: this.user.userName,
      tags: discuss.category ? this.categoryList[discuss.category].tags : [],
      categories: discuss.category ? [this.categoryList[discuss.category].id] : [],
      contentType: 0}));
    this.router.navigate(['/community/discussion/preview']);
  }
}