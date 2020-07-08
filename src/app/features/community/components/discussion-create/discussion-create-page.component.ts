import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from '../../services/discussion.service';
import { MenuService } from '../../services/menu.service';
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { Breadcrumb } from 'src/app/core/interfaces';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiConstants } from 'src/app/api.constants';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

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
  fileData: FormData;
  
  constructor(private route: ActivatedRoute, private router: Router, 
    private discussionService: DiscussionService, private menuService: MenuService,
    private store: StorageHelperService, private authService: AuthService,
    private fb: FormBuilder, private http: HttpClient) { }

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
    }
    this.discussForm = this.fb.group({
      title:  [discuss ? discuss.title : "", Validators.required],
      description:  [discuss ? discuss.description : "", Validators.required],
      category: [discuss && discuss.category ? discuss.category : null],
      file: [""],
      linkInfoUrl: [discuss && discuss.linkInfoUrl ? discuss.linkInfoUrl : ""]
    });
    this.discussForm.valueChanges.subscribe(values => {
      let discuss = null;
      discuss = { ...values };
      discuss.discussId = this.discussId;
      this.store.store("new-discuss", JSON.stringify(discuss));
    })
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
    this.authService.userSource.subscribe(
      user => {
        if (!user) {
          this.discussForm.reset();
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
    
    
    if(this.fileData){
      this.uploadFile(this.fileData,"discussion_image").subscribe( file => {
        if(discuss.linkInfoUrl){
         this.getLinkInfo(discuss.linkInfoUrl).subscribe( linkinfo => {
            discuss.linkInfo = linkinfo;
            this.storeThenRedirect(discuss,file);
         })
        }
        else{
          discuss.linkInfo = null;
          this.storeThenRedirect(discuss,file);
        }
      })
    }
    else{
      if(discuss.linkInfoUrl){
        this.getLinkInfo(discuss.linkInfoUrl).subscribe( linkinfo => {
           discuss.linkInfo = linkinfo;
           this.storeThenRedirect(discuss,"");
        })
       }
       else{
         discuss.linkInfo = null;
         this.storeThenRedirect(discuss,"");
       }
    }
  }

  storeThenRedirect(discuss,file){
    let obj = {
      description: discuss.description,
      title: discuss.title,
      userId: this.user.id,
      userName: this.user.userName,
      tags: discuss.category ? this.categoryList[discuss.category].tags : [],
      categories: discuss.category ? [this.categoryList[discuss.category].id] : [],
      articlePhotoFilename: file ? {
                                      original:"null",
                                      titleImage: file,
                                      thumbnailImage:file
                                    } : null ,
      contentType: 0,
      linkInfo: discuss.linkInfo,
      linkInfoUrl: discuss.linkInfoUrl
    };
    console.log(obj)
    this.store.store("new-discuss-preview", JSON.stringify(obj));
    this.router.navigate(['/community/discussion/preview',{id:'preview'}]);
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.fileData = new FormData();
      this.fileData.append('images', file);
      this.fileData.append("name", "discussion_image");
      this.fileData.append("description", "discussion_image_description");
    }
  }

  uploadFile(formData: FormData,type: string): Observable<any> {
    return this.http.post<any>(ApiConstants.IMAGE_UPLOAD + "?typ="+type, formData).pipe(
      map((response) => {
        if (response && response.data) {
          return response.data[0];
        }
      })
    );
  }

  getLinkInfo(url){
    return this.http.get<any>(ApiConstants.GET_LINK_INFO + "?url="+ encodeURI(url) ).pipe(
      map((response) => {
        console.log(response);
        if (response && response.data) {
          return response.data;
        }
      })
    );
  }
}