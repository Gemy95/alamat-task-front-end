import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/view_models/request';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/view_models/user';
import { Post } from 'src/app/view_models/post';


@Component({
  selector: 'app-show-request',
  templateUrl: './show-request.component.html',
  styleUrls: ['./show-request.component.scss']
})
export class ShowRequestComponent implements OnInit {

  arrayRequests:Array<Request>=[];
  arrayUsers:Array<User>=[];
  arrayPosts:Array<Post>=[];

  isEmptyRequests:boolean=false;
  
  selectedStatus:String="";

  constructor(private RequestService:RequestService) { }

  ngOnInit() {
    this.RequestService.getAllRequests(this.selectedStatus).subscribe(
      (data)=>{
        for(let i=0;i<data.length;i++)
        {
           if(localStorage.getItem("ownerID")==data[i].ownerEmail)
           {
                this.arrayRequests.push(data[i]);
                this.RequestService.getUserByEmail(data[i].userEmail).subscribe(
                  (data)=>{
                    this.arrayUsers.push(data);
                  },
                  (err)=>{console.log(err)}
                );

                this.RequestService.getPostById(data[i].postID).subscribe(
                  (data)=>{
                    this.arrayPosts.push(data);
                  },
                  (err)=>{console.log(err)}
                );

           }
        }
      },
      (err)=>{console.log(err)},
      ()=>{

        if(this.arrayUsers.length==0 && this.arrayPosts.length==0 && this.arrayRequests.length==0)
        {
          this.isEmptyRequests=true;
        }

      }
    );

  }

  onChange(event)
  {
    console.log(this.selectedStatus);
    this.arrayRequests=[];
    this.arrayUsers=[];
    this.arrayPosts=[];
    this.ngOnInit();
  }

  acceptRequest(req)
  {  
    window.location.reload();
    this.RequestService.updateRequestStatus(req,"accepted").subscribe(
      (data)=>{this.ngOnInit();},
      (err)=>{console.log(err)}
    );
  }

  rejectRequest(req)
  {
    window.location.reload();
    this.RequestService.updateRequestStatus(req,"rejected").subscribe(
      (data)=>{this.ngOnInit();},
      (err)=>{console.log(err)}
    );
  }

}
