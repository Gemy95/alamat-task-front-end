import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Post } from '../view_models/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private HttpClient:HttpClient) { }


  addPost(postObj:Post)
  {
    console.log(postObj);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
     return this.HttpClient.post(`${environment.API_URL}addPost`,postObj,httpOptions);
  }

 getPostsByPaginate(pageNum) : Observable <any[]>
 {
  return this.HttpClient.get <any[]> (`${environment.API_URL}getPosts/${pageNum}`);
 }


 
 getPostscount() : Observable <any>
 {
  return this.HttpClient.get <any> (`${environment.API_URL}getPostsCount`);
 }

 addPostIdToArrayOwnerPosts(postId)
 { 
  return this.HttpClient.get <any> 
  (`${environment.API_URL}addPostIDToOwner/${localStorage.getItem("ownerID")}/${postId}`);
 }

}
