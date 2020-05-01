import { Component, OnInit, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/features/community/services/menu.service';
import { Observable, observable } from 'rxjs';
import { UserService } from 'src/app/features/user/services/user.service';

@Component({
  selector: 'app-share-via-media',
  templateUrl: './share-via-media.component.html',
  styleUrls: ['./share-via-media.component.scss']
})
export class ShareViaMediaComponent implements OnInit {

  whatsappUrl;
  currentUrl: string;
  profileName:string;
  message:string="I found this on the Joy of Age community and thought it would be of interest to you! Click on the below link to know more:";
  message2:string="If you are not a part go the Joy Of Age community yet, I think you would enjoy being a part of it. Please do join today!"
  constructor(public sanitizer: DomSanitizer, public shareMedia:MenuService,private userProfile:UserService) { 
  
  }

  ngOnInit() {
  this.userProfile.getUserProfile().subscribe(res=>{
  // console.log(res,'in share');
  // console.log(res.basicProfileInfo.firstName)
  this.profileName=res.basicProfileInfo.firstName;
})
   this.shareMedia.getshareMedia().subscribe(res=>{
      this.currentUrl=res;
    })
    this.currentUrl=encodeURI(window.location.href)
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(this.currentUrl)}`);
  }

}
