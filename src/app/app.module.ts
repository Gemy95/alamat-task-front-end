import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { FormLoginComponent } from './layouts/user/form-login/form-login.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule ,Routes} from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormRegisterComponent } from './layouts/user/form-register/form-register.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './layouts/user/user-profile/user-profile.component';
import { UserLogoutComponent } from './layouts/user/user-logout/user-logout.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr';
import { AddPostComponent } from './layouts/add-post/add-post.component'; 
import { AuthUserGuard } from './auth/auth-user.guard';
import { AuthOwnerGuard } from './auth/auth-owner.guard';
import { ShowRequestComponent } from './layouts/show-request/show-request.component';


const routes: Routes = [

  { path: 'home', component:  HomeComponent},
  { path: 'form-login', component:  FormLoginComponent},
  { path: 'form-register', component:  FormRegisterComponent},
  { path: 'user-profile', component:  UserProfileComponent,canActivate:[AuthUserGuard] },
  { path: 'user-logout', component:  UserLogoutComponent},
  { path: 'form-add-post' , component:AddPostComponent ,canActivate:[AuthOwnerGuard] },
  { path: 'show-request', component:  ShowRequestComponent,canActivate:[AuthOwnerGuard]},
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: '**',component: HomeComponent }];


@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    HomeComponent,
    FormRegisterComponent,
    UserProfileComponent,
    UserLogoutComponent,
    FooterComponent,
    FileSelectDirective,
    AddPostComponent,
    ShowRequestComponent
    
    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,  
    ToastrModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
