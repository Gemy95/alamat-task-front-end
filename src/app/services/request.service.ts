import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Request } from '../view_models/request';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private HttpClient:HttpClient) { }


  addRequest(obj:Request) 
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
     return this.HttpClient.post(`${environment.API_URL}addRequest`,obj,httpOptions);
  }

  getAllRequests(status):Observable<any[]>
  {
    return this.HttpClient.get<any[]>(`${environment.API_URL}getAllRequests/${status}`);
  }

  getOwnerEmailByPostId(postId):Observable<any>
  {
    return this.HttpClient.get<any>(`${environment.API_URL}getOwnerEmailByPostId/${postId}`);
  }

  getUserByEmail(email)
  {
    return this.HttpClient.get<any>(`${environment.API_URL}getUserByEmail/${email}`);
  }

  
  getPostById(id)
  {
    return this.HttpClient.get<any>(`${environment.API_URL}getPostById/${id}`);
  }

  updateRequestStatus(obj,newStatus)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
     return this.HttpClient.post(`${environment.API_URL}updateRequestStatus/${newStatus}`,obj,httpOptions);
  }


  
  getAllRequestsByUserEmail(userEmail):Observable<any []>
  {
    return this.HttpClient.get<any []>(`${environment.API_URL}getAllRequestsByUserEmail/${userEmail}`);
  }

  
  getAllPosts():Observable<any []>
  {
    return this.HttpClient.get<any []>(`${environment.API_URL}getAllPosts`);
  }



}
