import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterLoginService } from '../services/register-login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthOwnerGuard implements  CanActivate{
  constructor(private RegisterLoginService:RegisterLoginService,private Router:Router){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.RegisterLoginService.ownerIsLoggedIn()) {
                this.Router.navigate(['/form-login']);
                this.RegisterLoginService.deleteTokenOwner();
                return false;
      }
    return true;
  }
}