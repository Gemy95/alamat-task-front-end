import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterLoginService } from 'src/app/services/register-login.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent implements OnInit {

  constructor(private Router:Router,private RegisterLoginService:RegisterLoginService) { }

  ngOnInit() {
   localStorage.removeItem("userID");
   localStorage.removeItem("ownerID");
   this.RegisterLoginService.deleteTokenOwner();
   this.RegisterLoginService.deleteTokenUser();
   this.Router.navigate(['/form-login']).then(()=>{
    window.location.reload();
   });
  }

}
