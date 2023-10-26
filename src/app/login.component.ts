import {Component} from "@angular/core";

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";


@Component({
  selector: 'login-form',
  template: `
    <div class="container">
      <form>
        <div class="form-group">
          <label>Nickname</label>
          <input #editID [value]="id" type="text">
        </div>
        <div class="form-group">
          <label>Birth Day</label>
          <input #editBD [value]="bd" type="text">
        </div>
      </form>
      <button (click)=onLoginButtonClicked(editID.value,editBD.value)>Login</button>
    </div>`,
  styles: [`

  `]
})
export class loginComponent {

  id = ""
  bd = ""

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
