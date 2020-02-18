import { Component, OnInit , Output,EventEmitter} from '@angular/core';
import { AuthService } from 'src/app/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-view-address-details',
  templateUrl: './view-address-details.component.html',
  styleUrls: ['./view-address-details.component.scss']
})
export class ViewAddressDetailsComponent implements OnInit {
  @Output() editProfile = new EventEmitter();
  constructor(
    public userService: UserService,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  edit(modal_address) {
    alert("Please Submit or Cancel before edit");
    console.log('modal_address')
    
  }

}
