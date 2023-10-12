import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SignUpDto } from 'src/app/models/dto/signUpDTO';
import { SsoDto } from 'src/app/models/dto/ssoDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountRepository {
  private apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) { }

  register(newUser: SignUpDto): Observable<SignUpDto> {
    console.log(newUser);
    return this.httpClient
      .post<SignUpDto>(
        `${this.apiUrl}/api/Auth/sign-up`,
        newUser
      )
      .pipe(
        map((ret) => {
          console.log(ret);
          return ret;
        })
      );
  }

  registerColetor(newUser: SignUpDto): Observable<SignUpDto> {
    console.log(newUser);
    return this.httpClient
      .post<SignUpDto>(
        `${this.apiUrl}/api/Auth/sign-up-coletor`,
        newUser
      )
      .pipe(
        map((ret) => {
          console.log(ret);
          return ret;
        })
      );
  }

  login(username: string, password: string): Observable<SsoDto> {
    console.log({ username, password });
    console.log(`${this.apiUrl}/api/Auth/sign-in`);
    return this.httpClient
      .post<SsoDto>(`${this.apiUrl}/api/Auth/sign-in`, { username, password })
      .pipe(
        map((ret: SsoDto) => {
          return ret;
        })
      );
  }
}
