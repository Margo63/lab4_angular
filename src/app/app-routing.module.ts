import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {registerComponent} from "./registerScreen/register.component";
import {newsComponent} from "./newsScreen/news.component";
import {addNewsComponent} from "./addScreen/addNews.component";
import {messageComponent} from "./message/message.components";

const routes: Routes =  [
  { path: 'register', component: registerComponent },
  { path: 'news/:id', component: newsComponent },
  { path: 'addNews/:id', component: addNewsComponent },
  { path: 'message/:id/:id2', component: messageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
