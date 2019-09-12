import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterLoginService } from 'src/app/services/register-login.service';
import { User } from 'src/app/view_models/user';
import { Owner } from 'src/app/view_models/owner';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})


export class FormRegisterComponent implements OnInit {

  selectType="user";

  emailRegEx="^[a-zA-Z]{3,15}[.]{1}[a-zA-Z0-9]{3,15}[@]{1}[a-z]{4,10}[.]{1}[a-z]{3,5}$";

  formGroupRegister=new FormGroup({
    userName : new FormControl ('',[Validators.required,Validators.minLength(3)]), 
    userEmail : new FormControl('',[Validators.required,Validators.pattern(this.emailRegEx)]),
    userPassword : new FormControl('',[Validators.required,Validators.minLength(5)]),
  });


  constructor(private RegisterLoginService:RegisterLoginService,private NotificationService:NotificationService
    ,private Router:Router) { 
  }

  ngOnInit() {
  
  }


  registerFunc()
  {
  
    
     if(this.selectType=="user")
     {
      var user=new User();
      user.userName=this.formGroupRegister.value.userName;
      user.email=   this.formGroupRegister.value.userEmail;
      user.password=this.formGroupRegister.value.userPassword
      this.RegisterLoginService.registerUser(user).subscribe((data)=>{
      this.NotificationService.showSuccess("success","status of add new user");
       console.log(data);
       this.Router.navigate(['/form-login']);
       user={};
    },(err)=>{
       console.log(err.error);
       this.NotificationService.showFailed("failed","status of add new owner");
    });
      }
      else
      {
        var owner=new Owner();
        owner.userName=this.formGroupRegister.value.userName;
        owner.email=   this.formGroupRegister.value.userEmail;
        owner.password=this.formGroupRegister.value.userPassword
        this.RegisterLoginService.registerOwner(owner).subscribe((data)=>{
          this.NotificationService.showSuccess("success","status of add new owner");
          console.log(data);
          owner={};
       this.Router.navigate(['/form-login']);
       },(err)=>{
          console.log(err.error);
          this.NotificationService.showFailed("failed","status of add new owner");
       });
      }
      

      console.log(this.selectType);


  }

  get userName(){return this.formGroupRegister.get('userName');}
  get userEmail(){return this.formGroupRegister.get('userEmail');}
  get userPassword(){return this.formGroupRegister.get('userPassword');}

}
