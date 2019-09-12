import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/view_models/post';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { PostService } from 'src/app/services/post.service';
import { NotificationService } from 'src/app/services/notification.service';


const URL = `${environment.API_URL}api/upload`;


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  showSuccessMessage:string="";
  showFailedMessage:string="";

  title = 'ng8fileupload';
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  
  formAddPost=new FormGroup({
    address:new FormControl('',[Validators.required,Validators.minLength(15)]),
    floorNumber:new FormControl('',[Validators.required]),
    roomNumber:new FormControl('',[Validators.required]),
    roomLength:new FormControl('',[Validators.required]),
    roomWidth:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    image : new FormControl('',[Validators.required]),
  });

  constructor(private PostService:PostService,private NotificationService:NotificationService) {
   }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //   console.log('ImageUpload:uploaded:', item, status, response);
     //    alert('File uploaded successfully');
    };
  }

  get address(){return this.formAddPost.get("address")}
  get floorNumber(){return this.formAddPost.get("floorNumber")}
  get roomNumber(){return this.formAddPost.get("roomNumber")}
  get roomLength(){return this.formAddPost.get("roomLength")}
  get roomWidth(){return this.formAddPost.get("roomWidth")}
  get price(){return this.formAddPost.get("price")}
  get image(){return this.formAddPost.get("image")}

  addFunction()
  {
    // console.log(this.formAddPost.value);

     var post=new Post();
     post.address=this.formAddPost.value.address;
     post.floorNumber=this.formAddPost.value.floorNumber;
     post.roomNumber=this.formAddPost.value.roomNumber;
     post.roomLength=this.formAddPost.value.roomLength;
     post.roomWidth=this.formAddPost.value.roomWidth;
     post.price=this.formAddPost.value.price;
     post.image="";
     post.date=new Date();
           
     setTimeout(()=>{
      
     this.PostService.addPost(post).subscribe(
     (postId)=>{
             this.PostService.addPostIdToArrayOwnerPosts(postId)
             .subscribe((data)=>{console.log(data),(err)=>{console.log(err)}});
             this.NotificationService.showSuccess("success","status of add new post");
             this.formAddPost.reset();
     },
     (err)=>{
           console.log(err);
           this.NotificationService.showFailed("failed","status of add new post");
      })

    },4000);
    

               }


}
