import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators } from '@angular/forms';
import { RegisterLoginService } from 'src/app/services/register-login.service';
import { User } from 'src/app/view_models/user';
import { Router } from '@angular/router';
import { Owner } from 'src/app/view_models/owner';
import { NotificationService } from 'src/app/services/notification.service';



@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})


export class FormLoginComponent implements OnInit {

  selectType :String="user";

  emailRegEx="^[a-zA-Z0-9]{3,15}[.]{1}[a-zA-Z0-9]{3,15}[@]{1}[a-zA-Z]{3,8}[.]{1}[a-z]{3}$";
  
  formGroupLogin=new FormGroup({
    userEmail : new FormControl('',[Validators.pattern(this.emailRegEx),Validators.required]),
    userPassword : new FormControl('',[Validators.required,Validators.minLength(5)]),
  });


  constructor(private RegisterLoginService:RegisterLoginService,
    private Router:Router,private NotificationService:NotificationService) {
   }

  ngOnInit() {
  }

  loginFunc()
  {
/*  console.log(this.formGroupLogin.value);
    console.log(this.formGroupLogin.status);
*/

if(this.selectType=="user")
{
 var user=new User();
 user.userName=this.formGroupLogin.value.userName;
 user.email=   this.formGroupLogin.value.userEmail;
 user.password=this.formGroupLogin.value.userPassword
this.RegisterLoginService.loginUser(user).subscribe((data)=>{
  localStorage.setItem("userID",user.email);
  this.NotificationService.showSuccess("success","status of login user");
  console.log(data.token);
  user={};
  this.RegisterLoginService.setTokenUser(data.token);
  this.Router.navigate(['/home']).then(()=>{location.reload()});
},(err)=>{
 // console.log(err.error);
  this.NotificationService.showFailed("failed","status of login user");
});
 }
 else
 {
   var owner=new Owner();
   owner.userName=this.formGroupLogin.value.userName;
   owner.email=   this.formGroupLogin.value.userEmail;
   owner.password=this.formGroupLogin.value.userPassword
   this.RegisterLoginService.loginOwner(owner).subscribe((data)=>{
    localStorage.setItem("ownerID",owner.email);
    this.NotificationService.showSuccess("success","status of login owner");
    // console.log(data);
     owner={};
     this.RegisterLoginService.setTokenOwner(data.token);
     this.Router.navigate(['/form-add-post']).then(()=>location.reload());
  },(err)=>{
     console.log(err.error);
     this.NotificationService.showFailed("failed","status of login owner");
  });
 }
 

  }
  
  get userEmail() { return this.formGroupLogin.get('userEmail'); }

  get userPassword() { return this.formGroupLogin.get('userPassword'); }


}
