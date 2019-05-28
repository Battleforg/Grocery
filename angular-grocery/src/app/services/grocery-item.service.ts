import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroceryItemService {
  private serverUrl = 'http://localhost:3000/api/v1/';

  constructor(
    private http: HttpClient
  ) { }

  // add a grocery item to list
  addItem(newItem: object): Observable<any> {
    return this.http.post(this.serverUrl + 'groceryItem', newItem).pipe(
      catchError(this.handleError<object>('add a new item', {}))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // log to console instead
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      // let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Log activities in this service
   * @param message - content to be logged
   */
  private log(message: string) {
    console.log('Message:' + message);
  }
}
