import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
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
    this.http.get<any>("http://localhost:3000/userModule/login", {params})
      .subscribe(value => {
        if (value.mes === "success") {
          this.router.navigateByUrl('/news/' + id);
        } else {
          alert("check nickname or bd")
        }


      }, error => {
        console.log(error)
      })
  }
}
