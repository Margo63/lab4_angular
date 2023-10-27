import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {registerComponent} from "./register.component";
import {newsComponent} from "./news.component";
import {addNewsComponent} from "./addNews.component";

const routes: Routes =  [
  { path: 'register', component: registerComponent },
  { path: 'news/:id', component: newsComponent },
  { path: 'addNews', component: addNewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
