import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-querydrawpopup',
  templateUrl: './querydrawpopup.component.html',
  styleUrls: ['./querydrawpopup.component.css']
})
export class QuerydrawpopupComponent  implements OnInit  {
  responseData: any[] = [];
  constructor(private http: HttpClient,
    private router: Router
    ) {} 
  ngOnInit(): void {
    this.getir();
  }
  getir() {
    this.http.get('https://localhost:5001/api/Map/Get').subscribe(
      (response: any) => {
        this.responseData = response;
      },
      (error) => {
        console.error('Hata oluştu:', error);
      }
    );
  }
  deleteModel(model:any): void {
    const data={
      name:model.name,
      number:model.number
    };
    const url = `https://localhost:5001/api/Map/Delete`;

    this.http.post(url,data).subscribe(
      (response: any) => {
       this.router.navigate(['']);

      },
      (error) => {
        console.error('Hata oluştu:', error);
      }
    );
  }
  
}
