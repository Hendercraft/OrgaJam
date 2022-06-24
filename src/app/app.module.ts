import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignUpComponent } from './sign-up/sign-up.component';


import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "./services/auth/auth.service";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfilComponent } from './profil/profil.component';
import { MessageComponent } from './message/message.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { ProfileCardComponent } from './home/profile-card/profile-card.component';
import { FeedComponent } from './home/feed/feed.component';
import { FriendsCardComponent } from './home/friends-card/friends-card.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {SignInComponent} from "./sign-in/sign-in.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {StorageService} from "./services/storage/storage.service";
import { PostsComponent } from './posts/posts.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostComponent } from './post/post.component';
import { FriendComponent } from './friend/friend.component';
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SearchComponent } from './search/search.component';
import { UserDisplayComponent } from './user-display/user-display.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { FriendDisplayComponent } from './friend-display/friend-display.component';



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    NavBarComponent,
    ProfilComponent,
    MessageComponent,
    HomeComponent,
    SidebarComponent,
    ProfileCardComponent,
    FeedComponent,
    FriendsCardComponent,
    SignInComponent,
    WelcomeComponent,
    PostsComponent,
    AddPostComponent,
    PostComponent,
    FriendComponent,
    SearchComponent,
    UserDisplayComponent,
    CommentsComponent,
    CommentComponent,
    FriendDisplayComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        RouterModule,
        MatIconModule,
        MatSlideToggleModule,
        MatSidenavModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        MatDividerModule,
        MatListModule,
        FormsModule,
        MatSelectModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatProgressSpinnerModule
    ],
  providers: [AuthService,StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
