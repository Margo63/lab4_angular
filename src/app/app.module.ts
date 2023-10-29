import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { registerComponent } from './registerScreen/register.component';
import { newsComponent } from './newsScreen/news.component';
import { addNewsComponent } from './addScreen/addNews.component';
import {RegisterFormComponent} from "./registerScreen/registerForm.components";
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import {loginComponent} from "./registerScreen/login.component";
import {userNewsComponent} from "./newsScreen/usernews.component";
import {DataService} from "./service/data.service";
import {SocketioService} from "./socket-io.service";
import {messageComponent} from "./message/message.components";

@NgModule({
  declarations: [
    AppComponent,
    registerComponent,
    newsComponent,
    addNewsComponent,
    RegisterFormComponent,
    loginComponent,
    userNewsComponent,
    messageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [DataService,SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
