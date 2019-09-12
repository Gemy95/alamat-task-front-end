import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterLoginService } from '../services/register-login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate{
  constructor(private RegisterLoginService:RegisterLoginService,private Router:Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.RegisterLoginService.userIsLoggedIn()) {
                this.Router.navigate(['/form-login']);
                this.RegisterLoginService.deleteTokenUser();
        return false;
      }
    return true;
  }
}