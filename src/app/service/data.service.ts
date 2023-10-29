import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private router: Router) {
  }

  private data: string[] = ["hehe", "hoho"
  ]

  getData(): string[] {
    return this.data;
  }

  addData(title: string) {
    this.data.push(title)
    console.log(`Добавлен: "${title}"`)
  }

  loginUser(id: string, bd: string) {
    const params = new HttpParams()
      .set('id', id)
      .set('bd', bd);
    this.http.get<any>("http://localhost:4000/userModule/login", {params})
      .subscribe(value => {
        if (value.mes === "success") {
          this.router.navigateByUrl('/news/' + id).then(() => {
            window.location.reload();
          });
        } else {
          alert("check nickname or bd")
        }

      }, error => {
        console.log(error)
      })
  }

  registerUser(editID: string, editName: string, editBD: string, editEmail: string, editImage: string) {
    const headers = new HttpHeaders();
    const body = {
      id: editID,
      name: editName,
      BD: editBD,
      email: editEmail,
      img: editImage,
      "role": "пользователь",
      "state": "неподтвержденный пользователь",
      "news": [],
      "messages": [ ],
      "friends":[]

    }
    //alert(JSON.stringify(headers))

    this.http.post<any>("http://localhost:4000/userModule/addUser", body, {headers: headers})
      .subscribe(value => {

        if (value.mes == false)
          alert("nickname already exists")
        else if (value.mes == true) {
          this.router.navigateByUrl('/news/' + editID).then(() => {
            window.location.reload();
          });
        } else {
          alert("noooo")
        }

      }, error => {
        console.log(error)
      })
  }


}
