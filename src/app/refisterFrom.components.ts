import {Component} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

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

  `]
})
export class RegisterFormComponent {
  id = ""
  name = ""
  bd = ""
  email=""
  img=""

  constructor(private http: HttpClient,
              private router: Router) {
  }

  onRegisterButtonClicked(editID: string, editName: string, editBD:string,
                          editEmail:string, editImage: string) {

    const headers = new HttpHeaders();
    const body = {
      id: editID,
      name: editName,
      BD: editBD,
      email:editEmail,
      img: editImage

    }
    alert(JSON.stringify(headers))

    this.http.post<any>("http://localhost:3000/userModule/addUser", body, {headers: headers})
      .subscribe(value => {

        if (value.mes == false)
          alert("nickname already exists")
        else if(value.mes == true){

          this.router.navigateByUrl('/news');
        }else{
          alert("noooo")
        }

      }, error => {
        console.log(error)
      })
  }
}
