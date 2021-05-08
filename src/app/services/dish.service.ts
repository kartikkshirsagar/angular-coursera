import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {Observable,of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import {map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMessageService } from './process-http-message.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,private phms: ProcessHttpMessageService) { }

  getDishes(): Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.phms.handleError));
    
    // return new Promise(
    //   resolve => {
    //     //simulate server delay
    //     setTimeout(()=>resolve(DISHES),2000);
    //   }
    // );
  }

  getDish(id:string):Observable<Dish>{
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.phms.handleError));

    
    
    // return new Promise(
    //   resolve => {
    //     //simulate server delay
    //     setTimeout(()=>resolve(DISHES.filter((dish) => dish.id === id)[0]),2000);
    //   }
    // );
  }
  getFeaturedDish():Observable<Dish>{
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.phms.handleError));

    
    // return new Promise(
    //   resolve => {
    //     //simulate server delay
    //     setTimeout(()=>resolve(DISHES.filter((dish) => dish.featured)[0]),2000);
    //   }
    // );
    //dish.featured === true is same as dish.featured coz boolean
  }

  getDishIds():Observable<string[]|any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
  }

  putDish(dish:Dish): Observable<Dish>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish,httpOptions)
    .pipe(catchError(this.phms.handleError));
  }

}
