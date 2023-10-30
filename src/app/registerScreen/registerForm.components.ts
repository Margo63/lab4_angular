import {Component} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {DataService} from "../service/data.service";

@Component({
  selector: 'register-form',
  template: `
    <div class="container">
      <form>
        <div class="form-group">
          <label>Nickname</label>
          <input #editId [value]="id" type="text">
        </div>
        <div class="form-group">
          <label>Name</label>
          <input #editName [value]="name" type="text">
        </div>
        <div class="form-group">
          <label>Birth Day</label>
          <input #editBD [value]="name" type="text">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input #editEmail [value]="name" type="text">
        </div>
        <div class="form-group">
          <label>Image</label>
          <input #editImage [value]="name" type="text">
        </div>
      </form>
      <button (click)=onRegisterButtonClicked(editId.value,editName.value,editBD.value,editEmail.value,editImage.value)
      >Register</button>
    </div>`,
  styles: [`
    label{
      margin-right: 10px;
    }
    input{
      margin-top: 15px;
      font-size: 25px;
    }
    button{
      margin-top: 15px;
      background-color: #FFFFFF;
      font-size: 30px;
      border-radius: 10px;
    }
  `]
})
export class RegisterFormComponent {
  id = ""
  name = ""
  bd = ""
  email=""
  img=""

  constructor(private http: HttpClient,
              private router: Router, private dataService: DataService) {
  }

  onRegisterButtonClicked(editID: string, editName: string, editBD:string,
                          editEmail:string, editImage: string) {
    this.dataService.registerUser(editID, editName, editBD,editEmail, editImage);
  }

   // alert(this.dataService.getData())


}
