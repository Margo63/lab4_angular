import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { registerComponent } from './register.component';
import { newsComponent } from './news.component';
import { addNewsComponent } from './addNews.component';
import {RegisterFormComponent} from "./refisterFrom.components";
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import {loginComponent} from "./login.component";

@NgModule({
  declarations: [
    AppComponent,
    registerComponent,
    newsComponent,
    addNewsComponent,
    RegisterFormComponent,
    loginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
