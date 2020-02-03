import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router"
import { DiscussionService } from '../../services/discussion.service';
import { MenuService } from '../../services/menu.service';
import { StorageHelperService } from "../../../../core/services/storage-helper.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Breadcrumb, SEO } from 'src/app/core/interfaces';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/services/seo.service';

declare var UIkit;

@Component({
  selector: 'app-discussion-detail',
  templateUrl: './discussion-detail-page.component.html',
  styleUrls: ['./discussion-detail-page.component.scss']
})
export class DiscussionDetailPageComponent implements OnInit, OnDestroy {

  breadcrumbLinks: Breadcrumb[];
  discussionId: string;
  category: string;
  categoryName: string;
  discussion: any;
  urltxt: string;
  sortedReplies: any[];
  commentsCount: number;
  user: any;
  parentReplyId: string;
  replyId: string;
  replyForm: FormGroup;
  successMessage: String;
  paramsSubs: any;
  currentUrl: string;
  whatsappUrl;
  whatsappMobileUrl;

  constructor(private router: Router, private route: ActivatedRoute,
    private discussionService: DiscussionService, private menuService: MenuService,
    private fb: FormBuilder, private store: StorageHelperService,
    private authService: AuthService, public sanitizer: DomSanitizer,
    private seoService: SeoService) { }

  ngOnInit() {
    this.currentUrl = window.location.href;
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(this.currentUrl)}`);
    this.whatsappMobileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);
    this.paramsSubs = this.route.params.subscribe(params => {
      this.initiate();
    });
  }

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
  }

  initiate() {
    this.discussionId = this.route.snapshot.params['id'];
    this.successMessage = "";
    this.breadcrumbLinks = [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Community',
        link: '/community'
      },
      {
        text: 'All Articles & Discussions',
        link: '/community/discussions'
      }
    ];
    this.categoryName = "";
    if (this.route.snapshot.params['category']) {
      this.category = this.route.snapshot.params['category'];
    }
    this.parentReplyId = "";
    this.replyId = "";
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
    let comment = this.store.retrieve("new-d-comment");
    if (comment) {
      comment = JSON.parse(comment);
      this.discussionId = comment.discussionId;
      this.category = comment.category;
      this.parentReplyId = comment.parentReplyId;
      this.replyId = comment.replyId;
      this.store.clear("new-d-comment");
      UIkit.modal("#reply-modal-discussion").show();
    }
    this.replyForm = this.fb.group({
      commentTxt: [comment ? comment.commentTxt : "", Validators.required]
    });
    this.getDiscussion();
  }

  addComment() {
    let comment = { ...this.replyForm.value };
    if (!this.user) {
      this.store.store("new-d-comment",
        JSON.stringify({
          discussionId: this.discussionId,
          category: this.category,
          parentReplyId: this.parentReplyId,
          replyId: this.replyId,
          commentTxt: comment.commentTxt
        }));
      this.authService.redirectUrl = "community/discussion/" + this.discussionId + (this.category ? "/" + this.category : "");
      UIkit.modal("#reply-modal-discussion.uk-open").hide();
      this.router.navigate(['/user/signin']);
      return;
    }
    Object.keys(this.replyForm.controls).forEach(field => {
      const control = this.replyForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (!this.replyForm.valid) {
      return;
    }
    
    if (this.replyId) {
      this.discussionService.editComment(this.replyId, comment.commentTxt).subscribe((response: any) => {
        if (response.data.replies) {
          this.replyForm.reset();
          this.getDiscussion();
          UIkit.modal("#reply-modal-discussion.uk-open").hide();
        }
      });
    }
    else {
      this.discussionService.addComment({ type: 0 }, this.discussionId, this.parentReplyId, comment.commentTxt).subscribe((response: any) => {
        if (response.data.replies) {
          this.replyForm.reset();
          this.getDiscussion();
          //this.successMessage = "Reply Submitted successfully.";
          UIkit.modal("#reply-modal-discussion.uk-open").hide();
        }
      });
    }

  }

  // likeDiscussion() {
  //   this.discussionService.likeDiscussionReply(this.discussionId).subscribe((response: any) => {
  //     if (response.data.id) {
  //       this.discussion.aggrLikeCount = response.data.aggrLikeCount;
  //     }
  //   });
  // }

  likeReply(reply) {
    if (reply.likedByUser) {
      this.discussionService.unlikeReply(this.discussionId, reply.id).subscribe((response: any) => {
        if (response.data.id) {
          reply.likeCount = reply.likeCount - 1;
          reply.likedByUser = false;
        }
      });
    }
    else {
      this.discussionService.likeReply(this.discussionId, reply.id).subscribe((response: any) => {
        if (response.data.id) {
          reply.likeCount = reply.likeCount + 1;
          reply.likedByUser = true;
        }
      });
    }
  }

  getDiscussion() {
    if (this.category) {
      this.menuService.getMenuItem(this.category).subscribe((response: any) => {
        if (response[0]) {
          this.categoryName = response[0].displayMenuName;
          let found = 0;
          for(let br of this.breadcrumbLinks){
            if(br.queryParams && br.queryParams.category == this.category){
              found = 1;
            }
          }
          if(found == 0){
            this.breadcrumbLinks.push({
              text: this.categoryName,
              link: ['/community/discussions'],
              queryParams: { category: this.category }
            });
          }
        }
      });
    }

    if (this.discussionId == "preview") {
      this.discussion = this.store.retrieve("new-discuss-preview");
      this.discussion = JSON.parse(this.discussion);
      this.discussion.createdAt = new Date();
      this.discussion.username = this.discussion.userName;
      this.discussion.text = this.discussion.description;
      this.discussion.userProfile = { basicProfileInfo: { profileImage: { thumbnailImage: "" } } };
    }
    else {
      this.discussionService.getDiscussion(this.discussionId).subscribe((response: any) => {
        if (response.data.discuss) {
          this.discussion = response.data.discuss;
          this.setSeoTags(this.discussion);
          this.sortedReplies = response.data.sortedReplies;
          this.commentsCount = 0;
          if (this.sortedReplies) {
            this.commentsCount = Object.keys(this.sortedReplies).length;
          }
        }
      });
    }
  }

  setSeoTags(discussion: any) {
    let config: SEO = {
      title: `An Elder Spring Initiative by Tata Trusts Dscussions on ${discussion.title}`,
      keywords: 'products,services,events,dscussions',
      description: `${discussion.shortSynopsis}`,
      author: `An Elder Spring Initiative by Tata Trusts`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Community-320.png`,
    }

    if (discussion.userProfile && discussion.userProfile.basicProfileInfo && 
        discussion.userProfile.basicProfileInfo.profileImage && 
        discussion.userProfile.basicProfileInfo.profileImage.thumbnailImage) {
      config.image = discussion.userProfile.basicProfileInfo.profileImage.thumbnailImage;
    }

    this.seoService.generateTags(config);
  }

  setParentReplyId(id) {
    this.replyForm.reset();
    this.parentReplyId = id;
    this.replyId = "";
    this.successMessage = "";
  }

  editReply(parentReplyId, reply) {
    this.parentReplyId = parentReplyId;
    this.replyId = reply.id;
    this.replyForm.patchValue({ commentTxt: reply.text });
    this.successMessage = "";
  }

  onCancelPublish() {
    this.router.navigate(["community/discussion/add"]);
  }

  onPublish() {
    if (!this.user) {
      this.authService.redirectUrl = "community/discussion/preview";
      this.router.navigate(['/user/signin']);
      return;
    }
    this.discussionService.addDiscussion("P", this.discussion.description, this.discussion.title,
      this.discussion.userId,
      this.user.userName,
      this.discussion.tags,
      this.discussion.categories,
      this.discussion.contentType)
      .subscribe((response: any) => {
        if (response.data.id != "") {
          this.store.clear("new-discuss");
          this.store.clear("new-discuss-preview");
          this.router.navigate(['/community/discussion', response.data.id]);
        }
        else {
          alert("Oops! something wrong happen, please try again.");
        }
      });
  }



  get formControl() {
    return this.replyForm.controls;
  }

  /**
   * TODO: method to be removed
   */
  setDefaultPic(e) {
    e.target.src = "/assets/images/default-thumbnail.png";
  }
}