import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-profile-picture-form',
  templateUrl: './change-profile-picture-form.component.html',
  styleUrls: ['./change-profile-picture-form.component.scss']
})
export class ChangeProfilePictureFormComponent implements OnInit {

  constructor(private auth: AuthService, public userService: UserService) { }

  ngOnInit() {
  }


  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData = new FormData();
      formData.append('images', file);
      formData.append("name", "new");
      formData.append("description", "test");
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        alert("Only images are supported.");
        return;
      }

      console.log(formData.getAll);

      this.userService.uploadUserImage(formData).subscribe(
        response => {
          console.log(response);
        })
    }
  }

}
