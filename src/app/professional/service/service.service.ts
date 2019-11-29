import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Service } from '../model/service';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private API = 'http://jdbc.com.br:10002/agenda-tomcat/servico-service/get-servicos';

  constructor(private http: HttpClient) { }

  public list(): Observable<Service[]> {
    return this.http.get<Service[]>(this.API).pipe(
      map(
        (response) => response
      ),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      console.error(
        `Backend retornou erro ${error.status}, ` +
        `corpo: ${error.error}`);
    }
    return throwError(
      'Erro na comunicação com o servidor.');
  }
}
