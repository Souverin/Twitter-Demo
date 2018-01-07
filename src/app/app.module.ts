import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { AuthGuard} from './services/auth-guard.service';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase';
firebase.initializeApp(environment.firebase);

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { StartPageComponent } from './start-page/start-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { MyWallComponent } from './my-wall/my-wall.component';
import { BriefUserInfoComponent } from './shared/components/brief-user-info/brief-user-info.component';
import { PostNewsFormComponent } from './shared/components/wall/post-news-form/post-news-form.component';
import { WallComponent } from './shared/components/wall/wall.component';
import { PostComponent } from './shared/components/wall/post/post.component';
import { FollowInfoComponent } from './my-wall/follow-info/follow-info.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SearchFieldComponent } from './users-list/search-field/search-field.component';
import { FoundListComponent } from './users-list/found-list/found-list.component';
import { SbElseWallComponent } from './sb-else-wall/sb-else-wall.component';
import { HeaderComponent } from './header/header.component';

import {AuthService} from './services/auth.service';
import { FollowedComponent } from './my-wall/follow-info/followed/followed.component';
import {PostService} from './services/post.service';
import {UserService} from './services/user.service';
import {FollowService} from './services/follow.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent},
  { path: 'me', component: MyWallComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard]},
  { path: 'user/:id', component: SbElseWallComponent, canActivate: [AuthGuard]}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    StartPageComponent,
    RegisterFormComponent,
    MyWallComponent,
    BriefUserInfoComponent,
    PostNewsFormComponent,
    WallComponent,
    PostComponent,
    FollowInfoComponent,
    UsersListComponent,
    SearchFieldComponent,
    FoundListComponent,
    SbElseWallComponent,
    HeaderComponent,
    FollowedComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule
  ],
  providers: [AuthGuard, AuthService, PostService, UserService, FollowService],
  bootstrap: [AppComponent]

})
export class AppModule { }
