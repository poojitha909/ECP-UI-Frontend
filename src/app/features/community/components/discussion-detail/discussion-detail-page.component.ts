import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, ViewChild } from '@angular/core';
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
import { NotifierService } from "angular-notifier";
import { UserService } from 'src/app/features/user/services/user.service';

declare var UIkit;

@Component({
  selector: 'app-discussion-detail',
  templateUrl: './discussion-detail-page.component.html',
  styleUrls: ['./discussion-detail-page.component.scss']
})
export class DiscussionDetailPageComponent implements OnInit, AfterViewInit, OnDestroy {

  breadcrumbLinks: Breadcrumb[];
  discussionId: string;
  category: string;
  categoryName: string;
  discussion: any;
  urltxt: string;
  sortedReplies: any[];
  commentsCount: number;
  user: any;
  userProfilePreview: any;
  parentReplyId: string;
  replyId: string;
  replyForm: FormGroup;
  successMessage: String;
  paramsSubs: any;
  currentUrl: string;
  whatsappUrl;
  whatsappMobileUrl;
  currentModelLink: string;
  afterPublish: boolean = false;
  showMedia: boolean = true;

  private readonly notifier: NotifierService;
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;
  @ViewChild("customNotification1", { static: true }) customNotificationTmpl1;

  constructor(private router: Router, private route: ActivatedRoute,
    private discussionService: DiscussionService, private menuService: MenuService,
    private fb: FormBuilder, private store: StorageHelperService,
    private authService: AuthService, public sanitizer: DomSanitizer,
    private seoService: SeoService, notifierService: NotifierService,
    private userService: UserService) {
    this.notifier = notifierService
  }

  ngOnInit() {
    this.currentUrl = window.location.href;
    this.whatsappUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://web.whatsapp.com/send?text=${encodeURI(this.currentUrl)}`);
    this.whatsappMobileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`whatsapp://send?text=${encodeURI(this.currentUrl)}`);
    this.paramsSubs = this.route.params.subscribe(params => {
      this.initiate();
    });
  }

  ngAfterViewInit() {
  }

  initiate() {
    this.discussionId = this.route.snapshot.params['id'];
    this.successMessage = "";
    this.sortedReplies = [];
    this.breadcrumbLinks = [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Engage with us',
        link: '/community'
      }
    ];
    this.breadcrumbLinks[1].queryParams = this.route.snapshot.queryParams;
    this.categoryName = "";
    if (this.route.snapshot.params['category']) {
      this.category = this.route.snapshot.params['category'];
    }
    this.parentReplyId = "";
    this.replyId = "";
    this.user = this.store.retrieve("ECP-USER");
    if (this.user) {
      this.user = JSON.parse(this.user);
      if (this.discussionId == 'preview') {
        this.userService.getUserProfile().subscribe(
          userProfie => {
            this.userProfilePreview = userProfie
          },
          error => {
          }
        );
      }
    }
    let comment = this.store.retrieve("new-d-comment");
    if (comment) {
      comment = JSON.parse(comment);
      this.discussionId = comment.discussionId;
      this.category = comment.category;
      this.parentReplyId = comment.parentReplyId;
      this.replyId = comment.replyId;
      this.store.clear("new-d-comment");
      setTimeout(() => {
        UIkit.modal("#reply-modal-discussion").show();
      }, 500);
    }
    if (this.route.snapshot.params['id'] == 'preview') {
      this.showMedia = false;
    }
    else {
      this.showMedia = true;
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
          this.successMessage = "Your comment has been successfully posted.  You can edit your comment anytime by clicking on the ‘Edit’ link next to your comment";
          UIkit.modal("#reply-modal-discussion.uk-open").hide();
        }
      });
    }
    else {
      this.discussionService.addComment({ type: 0 }, this.discussionId, this.parentReplyId, comment.commentTxt).subscribe((response: any) => {
        if (response.data.replies) {
          this.replyForm.reset();
          this.getDiscussion();
          this.successMessage = "Your comment has been successfully posted.  You can edit your comment anytime by clicking on the ‘Edit’ link next to your comment";
          UIkit.modal("#reply-modal-discussion.uk-open").hide();
        }
      });
    }

  }



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
          for (let br of this.breadcrumbLinks) {
            if (br.queryParams && br.queryParams.category == this.category) {
              found = 1;
            }
          }
          if (found == 0) {
            this.breadcrumbLinks.push({
              text: this.categoryName,
              link: ['/community'],
              queryParams: { category: this.category }
            });
          }
        }
      },
        error => { },
        () => {

        }
      );
    }

    if (this.discussionId == "preview") {
      this.discussion = this.store.retrieve("new-discuss-preview");
      this.discussion = JSON.parse(this.discussion);
      this.discussion.createdAt = new Date();
      this.discussion.username = this.discussion.userName;
      this.discussion.text = this.sanitizer.bypassSecurityTrustHtml(this.discussion.description);
      this.discussion.userProfile = { basicProfileInfo: { profileImage: { thumbnailImage: "" } } };
    }
    else {
      this.discussionService.getDiscussion(this.discussionId).subscribe((response: any) => {
        if (response.data.discuss) {
          this.discussion = response.data.discuss;
          this.discussion.text = this.sanitizer.bypassSecurityTrustHtml(this.discussion.text);
          this.setSeoTags(this.discussion);
          this.sortedReplies = [];
          for (let i in response.data.sortedReplies) {
            this.sortedReplies[this.sortedReplies.length] = response.data.sortedReplies[i];
          }
          this.commentsCount = this.sortedReplies.length;
        }
      });
    }

    setTimeout(() => {
      if (this.successMessage) {
        window.scrollTo(0, document.getElementById("successMessageSection").offsetTop - 100);
      }
      else {
        document.getElementById("discussionTitleHeader").focus();
      }

    }, 500);
  }

  setSeoTags(discussion: any) {
    let config: SEO = {
      title: `Discussions - ${discussion.title}`,
      keywords: 'products,services,events,dscussions',
      description: `${discussion.shortSynopsis}`,
      author: `Social alpha`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Community-320.png`,
    }

    if (discussion.userProfile && discussion.userProfile.basicProfileInfo &&
      discussion.userProfile.basicProfileInfo.profileImage &&
      discussion.userProfile.basicProfileInfo.profileImage.thumbnailImage) {
      config.image = discussion.userProfile.basicProfileInfo.profileImage.thumbnailImage;
    }

    this.seoService.generateTags(config);
  }

  setParentReplyId(id, element_id) {
    this.replyForm.reset();
    this.parentReplyId = id;
    this.replyId = "";
    this.successMessage = "";
    this.onOpenModel();
    this.currentModelLink = element_id;
    UIkit.modal("#reply-modal-discussion").show();
    UIkit.util.on('#reply-modal-discussion', 'shown', () => {
      document.getElementById("addCommentTitle").focus();
    });
  }

  editReply(parentReplyId, reply) {
    this.parentReplyId = parentReplyId;
    this.replyId = reply.id;
    this.replyForm.patchValue({ commentTxt: reply.text });
    this.successMessage = "";
    // setTimeout(() => { document.getElementById("Comment").focus(); }, 0);
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
      this.discussion.contentType,
      this.discussion.articlePhotoFilename,
      this.discussion.linkInfo)
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

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeyHandler(event: KeyboardEvent) {
    this.onCloseModel();
  }

  onCloseModel() {
    document.getElementsByClassName("main-container")[0].removeAttribute("aria-hidden");
    document.getElementById(this.currentModelLink).focus();
  }

  onOpenModel() {
    document.getElementsByClassName("main-container")[0].setAttribute("aria-hidden", "true");
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

  ngOnDestroy() {
    this.paramsSubs.unsubscribe();
    document.getElementById("reply-modal-discussion").remove();
  }
}