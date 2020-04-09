import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-share-via-media',
  templateUrl: './share-via-media.component.html',
  styleUrls: ['./share-via-media.component.scss']
})
export class ShareViaMediaComponent implements OnInit {

  whatsappUrl;
  currentUrl: string;

  constructor(public sanitizer: DomSanitizer) { 
  
  }

  ngOnInit() {
    this.currentUrl = encodeURI(window.location.href);
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(this.currentUrl)}`);
  }
  
}
