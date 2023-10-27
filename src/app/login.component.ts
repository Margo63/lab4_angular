import {Component} from "@angular/core";

import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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

  onLoginButtonClicked(editId: string, editBD: string) {

    const params = new HttpParams()
      .set('id', editId)
      .set('bd', editBD);
    this.http.get<any>("http://localhost:3000/userModule/login", {params})
      .subscribe(value => {
        if(value.mes === "success"){
          this.router.navigateByUrl('/news/'+editId);
        }else{
          alert("check nickname or bd")
        }


      }, error => {
        console.log(error)
      })
  }
}
