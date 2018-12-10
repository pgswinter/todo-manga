import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Administrators} from '../interfaces/administrator.interface';
import {Hero} from '../interfaces/heroes.interface';
import { MessageService } from './message.service';
import {CorporateEmployee} from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
    // api_path = 'https://my-json-server.typicode.com/pgswinter/my-mockapi/administrators';
    api_path = 'https://my-json-server.typicode.com/pgswinter/my-mockapi/users';
    api_heroes = 'http://demo2339618.mockable.io/heroes';
    constructor(
      private http: HttpClient,
      private messageService: MessageService
    ) { }
    getData(): Observable<Administrators[]> {
      return this.http.get<Administrators[]>(this.api_path);
    }
    // searchData(term: string): Observable<Administrators[]> {
    //   if (!term.trim()) {
    //     return of([]);
    //   }
    //   return this.http.get<Administrators[]>(`${this.api_path}/?email=${term}`).pipe(
    //     tap(_ => this.log(`found admins matching "${term}"`)),
    //     catchError(this.handleError<Administrators[]>('searchData', []))
    //   );
    // }

    searchData(term: string): Observable<CorporateEmployee[]> {
      if (!term.trim()) {
        return of([]);
      }
      return this.http.get<CorporateEmployee[]>(`${this.api_path}/?name=${term}`).pipe(
        tap(_ => this.log(`found admins matching "${term}"`)),
        catchError(this.handleError<CorporateEmployee[]>('searchData', []))
      );
    }

    // searchData(name: string) {
    //   return fetch(`${this.api_path}/?name=${name}`)
    //     .then((response) => response.json());
    // }

    getHeroes(): Observable<Hero[]> {
      return this.http.get<Hero[]>(this.api_heroes);
    }
    searchHeroes(term: string): Observable<Hero[]> {
      if (!term.trim()) {
        return of([]);
      }
      return this.http.get<Hero[]>(`${this.api_heroes}/?name=${term}`).pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    }
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
    }
}
