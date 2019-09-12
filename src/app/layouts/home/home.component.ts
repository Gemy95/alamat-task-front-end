import { Component, OnInit , ViewChild, AfterViewInit,ElementRef } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/view_models/post';
import { Request } from 'src/app/view_models/request';
import { RequestService } from 'src/app/services/request.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , AfterViewInit  {

  @ViewChild('accessId', {static: false}) accessId: ElementRef;

   pagePost:number=0;
   pagesCountPost:Array<Number>=[];
   arrayOfPosts:Array<Post>=[];
   allPosts:Array<Post>=[];
   arrayOfRequest:Array<Request>=[];

   isUserActive:boolean=false;
 
   isThereAnyRequest:boolean=false;

   arrayBtn:Array<boolean>=[];


  constructor(private PostService:PostService,private RequestService:RequestService,
    private NotificationService:NotificationService) { 

    if(localStorage.getItem("userToken"))
    {
      this.isUserActive=true;
    }

  }

  ngOnInit() {

    this.countAllPosts();
    this.getPostByPageNum(this.pagePost);


    this.RequestService.getAllRequestsByUserEmail(localStorage.getItem("userID")).subscribe(
      (data)=>{
        for(let i=0;i<data.length;i++)
        {
              this.arrayOfRequest.push(data[i]);
              //this.arrayBtn.push(false);
        }
       //console.log(this.arrayOfRequest);
        if(data.length>0)
        {
         this.isThereAnyRequest=true;
        }
      },
      (err)=>{console.log(err)}
    )
   
  }


  setPagePost(i,event:any,status)
  {
    event.preventDefault();
    this.pagePost=i;
    //console.log('i='+i);
    //console.log("this.page="+this.page);
    this.arrayOfRequest=[];
    this.allPosts=[];
    this.ngOnInit();
  }


countAllPosts()
{ 
  this.pagesCountPost=[];

  this.PostService.getPostscount().subscribe(
    (data)=>{
    //  console.log(data);
      for(let i=0;i<Math.ceil(data/4);i++)
      {
           this.pagesCountPost.push(i);
      }
    }
    , (err)=>{
      console.log(err);
    }
  );
}

getPostByPageNum(pageNum)
{
   this.arrayOfPosts=[];

   this.PostService.getPostsByPaginate(pageNum).subscribe(
     (data)=>{
       this.arrayOfPosts=data;
    },
     (err)=>{console.log(err)}
   )
}


bookNowFun(postID)
{
  var userID=localStorage.getItem("userID");
  var request=new Request();
  request.userEmail=userID;
  request.postID=postID;
  request.status="pending";

  this.RequestService.getOwnerEmailByPostId(postID).subscribe(
    (data)=>{
    request.ownerEmail=data.email;
      // console.log(request);
      this.RequestService.addRequest(request).subscribe(
        (data)=>{
         // window.location.reload();
         // this.arrayOfRequest=[];
          //this.ngOnInit();
          this.isThereAnyRequest=true;
         // console.log(this.isThereAnyRequest);
         this.NotificationService.showSuccess("success","booking status");
        }),
        (err)=>{
            console.log(err);
            this.NotificationService.showFailed("failed","booking status");
        },
        ()=>{  
        }
    
    },
    (err)=>{console.log(err)}
   )

  
 }

 ngAfterViewInit() {
//  this.accessId.nativeElement.disabled=true;
  }

  disabledfun(i)
  {
     this.arrayBtn[i]=true;
  }

/*
  checkIfBookedBefore()
  {
    if(this.pagePost==0)
    {
      for(let i=0;i<4;i++)
      {
         if(this.allPosts[i]._id==this.arrayOfRequest[i].postID)
         this.arrayBtn[i]=true;
         else
         this.arrayBtn[i]=false;
      }
    }
    else
    {
    for(let i=4;i<this.arrayOfRequest.length;i++)
    {
      if(this.allPosts[i]._id==this.arrayOfRequest[i].postID)
      this.arrayBtn[i]=true;
      else
      this.arrayBtn[i]=false;
    }
  }
  }
*/
}
