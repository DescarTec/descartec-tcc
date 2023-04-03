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

  constructor(private httpClient: HttpClient) {}

  register(newUser: SignUpDto, language: number): Observable<SignUpDto> {
    return this.httpClient
      .post<SignUpDto>(
        `${this.apiUrl}/api/Auth/sign-up?language=` + language,
        newUser
      )
      .pipe(
        map((ret) => {
          return ret;
        })
      );
  }

  login(name: string, password: string): Observable<SsoDto> {
    return this.httpClient
      .post<SsoDto>(`${this.apiUrl}/api/Auth/sign-in`, { name, password })
      .pipe(
        map((ret: SsoDto) => {
          return ret;
        })
      );
  }
}
