import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // users: any[] = [];
  //
  // constructor(private http: HttpClient) {
  //   this.loadUsers();
  // }
  //
  // // loadUsers() {
  // //   debugger;
  // //   this.http.get<any[]>('http://localhost:8080/album').subscribe(users => {
  // //     this.users = users;
  // //   });
  // // }
  //
  // loadUsers() {
  //   const urls = [
  //     'http://localhost:8080/album',
  //     'http://localhost:8080/album/**',
  //     'http://localhost:8080/bandas',
  //     'http://localhost:8080/bandas/**',
  //     'http://localhost:8080/musicas',
  //     'http://localhost:8080/musicas/**',
  //   ];
  //   urls.forEach(url => {
  //     this.http.get<any[]>(url).subscribe(
  //       users => {
  //         this.users = [...this.users, ...users];
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error(`Error loading users from ${url}:`, error.message);
  //         if (error.status === 403) {
  //           alert(`Access denied for ${url}. Please check your credentials.`);
  //         }
  //       }
  //     );
  //   });
  // }
}
