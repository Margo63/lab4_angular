import {Component} from "@angular/core";

import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {DataService} from "../service/data.service";


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

  constructor(private dataService: DataService) {}

  onLoginButtonClicked(editId: string, editBD: string) {
    this.dataService.loginUser(editId,editBD)
  }

}
