import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/view_models/request';
import { RequestService } from 'src/app/services/request.service';
import { Owner } from 'src/app/view_models/owner';
import { Post } from 'src/app/view_models/post';
import { PropertyWrite } from '@angular/compiler';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  arrayRequests:Array<Request>=[];
  arrayOwners:Array<Owner>=[];
  arrayPosts:Array<Post>=[];

  isEmptyRequests:boolean=false;


  constructor(private RequestService:RequestService)
  {

  }

  ngOnInit()
  {

    this.RequestService.getAllRequestsByUserEmail(localStorage.getItem("userID")).subscribe(
      (data)=>{
        for(let i=0;i<data.length;i++)
        {
              this.arrayRequests.push(data[i]);
        }
       // console.log(this.arrayRequests);
        if(this.arrayRequests.length==0)
          this.isEmptyRequests=true;
      },
      (err)=>{/*console.log(err)*/}
      ,
      ()=>{
        for(let i=0;i<this.arrayRequests.length;i++)
        {
        this.RequestService.getPostById(this.arrayRequests[i].postID).subscribe(
          (data)=>{
            this.arrayPosts.push(data);
          },
          (err)=>{/*console.log(err)*/}
        )
      }
        console.log(this.arrayPosts);
      }
    )

  }

}
