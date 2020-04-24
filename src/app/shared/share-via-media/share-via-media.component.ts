import { Component, OnInit, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/features/community/services/menu.service';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-share-via-media',
  templateUrl: './share-via-media.component.html',
  styleUrls: ['./share-via-media.component.scss']
})
export class ShareViaMediaComponent implements OnInit {

  whatsappUrl;
  currentUrl: string;

  constructor(public sanitizer: DomSanitizer, public shareMedia:MenuService) { 
  
  }

  ngOnInit() {
   this.shareMedia.getshareMedia().subscribe(res=>{
      this.currentUrl=res;
    })
    this.currentUrl=encodeURI(window.location.href)
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(this.currentUrl)}`);
  }

}
