import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project1';
  
   isOwnerActive:boolean=false;
   isUserActive:boolean=false;
    
   isUserOrOwnerActive:boolean=false;

   constructor()
   {
       if(localStorage.getItem("ownerToken"))
       {
         this.isOwnerActive=true;
       }

       if(localStorage.getItem("userToken"))
       {
         this.isUserActive=true;
       }


       if(localStorage.getItem("ownerToken")||localStorage.getItem("userToken"))
       {
         this.isUserOrOwnerActive=true;
       }

  }

}
