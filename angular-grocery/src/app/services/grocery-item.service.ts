import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroceryItemService {
  private serverUrl = 'http://localhost:3000/api/v1/';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Add a grocery item to a list
   * @param newItem the item to be added into the list
   */
  addItem(newItem: object): Observable<any> {
    return this.http.post(this.serverUrl + 'groceryItem', newItem).pipe(
      tap(_ => this.log(`add an item `)),
      catchError(this.handleError('add an item'))
    );
  }

  /**
   * Get all items in a list
   */
  getAllItems(): Observable<any> {
    return this.http.get(this.serverUrl + 'groceryItem').pipe(
      tap(_ => this.log('fetched items')),
      catchError(this.handleError('getAllItems()', { list: [] }))
    );
  }

  /**
   * Get an item by its id
   * @param id the id of the needed item
   */
  getItemById(id: string): Observable<any> {
    return this.http.get(`${this.serverUrl}groceryItem/${id}`).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError(`Get a grocery item id=${id}`))
    );
  }

  deleteItemById(id: string): Observable<any> {
    return this.http.delete(`${this.serverUrl}groceryItem/${id}`).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError(`Cannot delete item id=${id}`))
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
