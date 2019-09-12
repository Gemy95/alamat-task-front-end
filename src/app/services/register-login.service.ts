import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../view_models/user';
import { Owner } from '../view_models/owner';


@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private HttpClient:HttpClient) {
   
   }

   
   registerUser(userObj:User)  : Observable<any>
   {
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
       return (this.HttpClient.post<any>(`${environment.API_URL}registerUser`,userObj,this.noAuthHeader));   
    }

    registerOwner(ownerObj:Owner)  : Observable<any>
    {
     const httpOptions1 = {
       headers: new HttpHeaders({
         'Content-Type':  'application/json',
         'Access-Control-Allow-Origin': '*'
       })
     };
        return (this.HttpClient.post<any>(`${environment.API_URL}registerOwner`,ownerObj,this.noAuthHeader));   
     }


////////////////////////////user////////////////////////////
   loginUser(userObj:User) : Observable<any>
   {
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
       return (this.HttpClient.post<any>(`${environment.API_URL}loginUser`,userObj,httpOptions2));
   }


   setTokenUser(token:string)
   {
    localStorage.setItem("userToken",token);
   }

   deleteTokenUser()
   {
    localStorage.removeItem("userToken");
   }

   getUserPayload()
   {
     var token=localStorage.getItem("userToken");
     if(token)
     {
       var userPayload=atob(token.split('.')[1]);
       return JSON.parse(userPayload);
     }
     else
     {
       return null;
     }
   }

   userIsLoggedIn()
   {
     var usePayload=this.getUserPayload();
     if(usePayload)
     {
       return usePayload.exp >Date.now()/1000;
     }
     else
     {
       return false;
     }

   }


   ////////////////////////////owner////////////////////////////

   loginOwner(ownerObj:Owner) : Observable<any>
   {
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
       return (this.HttpClient.post<any>(`${environment.API_URL}loginOwner`,ownerObj,httpOptions2));
   }

   setTokenOwner(token:string)
   {
    localStorage.setItem("ownerToken",token);
   }

   deleteTokenOwner()
   {
    localStorage.removeItem("ownerToken");
   }

   getOwnerPayload()
   {
     var token=localStorage.getItem("ownerToken");
     if(token)
     {
       var userPayload=atob(token.split('.')[1]);
       return JSON.parse(userPayload);
     }
     else
     {
       return null;
     }
   }

   ownerIsLoggedIn()
   {
     var usePayload=this.getOwnerPayload();
     if(usePayload)
     {
       return usePayload.exp >Date.now()/1000;
     }
     else
     {
       return false;
     }

   }

}
