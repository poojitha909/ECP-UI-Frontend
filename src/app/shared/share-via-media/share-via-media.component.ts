import { Component, OnInit, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/features/community/services/menu.service';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-share-via-media',
  templateUrl: './share-via-media.component.html',
  styleUrls: ['./share-via-media.component.scss']
})
export class ShareViaMediaComponent implements OnInit {

  whatsappUrl;
  whatsappMblUrl;
  currentUrl: string;
  profileName: string;
  message: string = "I found this on the Joy of Age community and thought it would be of interest to you! Click on the below link to know more:";
  message2: string = "If you are not a part go the Joy Of Age community yet, I think you would enjoy being a part of it. Please do join today!"
  constructor(public sanitizer: DomSanitizer, public shareMedia: MenuService, private auth: AuthService) {

  }

  ngOnInit() {
    this.auth.userSource.subscribe(user => {
      // console.log(res,'in share');
      // console.log(res.basicProfileInfo.firstName)
      if (user) {
        this.profileName = user.userName;
      } else {
        this.profileName = "";
      }
    });
    this.shareMedia.getshareMedia().subscribe(res => {
      this.currentUrl = res;
    })
    this.currentUrl = encodeURI(window.location.href)
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(this.currentUrl)}`);
    this.whatsappMblUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://api.whatsapp.com/send?text='+this.currentUrl)
    
  }

}
