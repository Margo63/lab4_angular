import {Component} from "@angular/core";

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginForm} from "./loginFrom";

@Component({
  selector: 'login-form',
  template: `
    <div class="container">
      <form>
        <div class="form-group">
          <label for="myid">ID</label>
          <input #edit1 [value]="id" type="text">
        </div>
        <div class="form-group">
          <label
            for="title">Название</label>
          <input #edit2 [value]="name" type="text">
        </div>
      </form>
      <button (click)=onLoginButtonClicked(edit1.value,edit2.value)>Login</button>
    </div>`,
  styles: [`

  `]
})
export class loginComponent {
  item = new LoginForm(1, 'ABC');
  id = ""
  name = ""

  constructor(private http: HttpClient,
              private router: Router) {
  }

  onLoginButtonClicked(edit1: string, edit2: string) {

    // const headers = new HttpHeaders();
    // const body = {id: edit1, p2: "Angular"}
    //
    // this.http.post<any>("http://localhost:3000/userModule/addUser", body, {headers: headers})
    //   .subscribe(value => {
    //
    //     if (!value)
    //       alert("nickname already exists")
    //     else {
    //       this.router.navigateByUrl('/news');
    //     }
    //
    //   }, error => {
    //     console.log(error)
    //   })
  }
}
