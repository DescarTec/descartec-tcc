import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountRepository } from '../repository/account.repository';
import { User } from 'src/app/models/user';
import { SsoDto } from 'src/app/models/dto/ssoDto';
import { SignUpDto } from 'src/app/models/dto/signUpDTO';


@Injectable({ providedIn: 'root' })
export class AccountService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUserObservable: Observable<User>;

  private accessTokenSubject: BehaviorSubject<string>;
  public accessTokenObservable: Observable<string>;

  constructor(
    private accountRepository: AccountRepository,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || null!)
    );
    this.currentUserObservable = this.currentUserSubject.asObservable();

    this.accessTokenSubject = new BehaviorSubject<string>(
      localStorage.getItem('accessToken') || null!
    );
    this.accessTokenObservable = this.accessTokenSubject.asObservable();
    
  }  
  public get currentUser(): User {
    return this.currentUserSubject.value;
  }

  public get access_token(): string {
    return this.accessTokenSubject.value;
  }

  login(name: string, password: string): Observable<SsoDto> {
    return this.accountRepository.login(name, password).pipe(
      map((data) => {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        console.log(data.access_token);
        localStorage.setItem('accessToken', data.access_token);

        this.accessTokenSubject.next(data.access_token);
        this.currentUserSubject.next(data.user);

        return data;
      })
    );
  }

  reset() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);

    localStorage.removeItem('accessToken');
    this.accessTokenSubject.next(null!);

    this.router.navigate(['/']);
  }

  register(user: SignUpDto) {
    return this.accountRepository.register(user);
  }

  registerColetor(user: SignUpDto) {
    return this.accountRepository.registerColetor(user);
  }

}
