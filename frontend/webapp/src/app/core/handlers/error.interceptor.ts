import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/domain/services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error instanceof ProgressEvent) {
          return throwError(
            () =>
              new HttpErrorResponse({
                error: 'Não foi possivel conectar com o servidor',
              })
          );
        }

        if (err.status === 401) {
          // logout if 401 response returned from api
          this.accountService.reset();
          location.reload();
        }
        return throwError(() => err);
      })
    );
  }
}
