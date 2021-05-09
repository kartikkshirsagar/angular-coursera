import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import {PROMOTIONS} from '../shared/promotions';
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
export class PromotionService {

  constructor(private http: HttpClient,private phms: ProcessHttpMessageService) { }

  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(this.phms.handleError));
    
    // return new Promise(
    //   resolve => {
    //     setTimeout(() =>resolve(PROMOTIONS));
    //   }
    // );
    // return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id:string):Observable<Promotion>{
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
    .pipe(catchError(this.phms.handleError));
    // return new Promise(
    //   resolve => {
    //     setTimeout(() => resolve(PROMOTIONS.filter((promo)=>promo.id === id)[0]),2000);
    //   }
    // );
    // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.id === id)[0]);
  }
  getFeaturedPromotion():Observable<Promotion>{
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
    .pipe(map(promo => promo[0]),catchError(this.phms.handleError));
    // return new Promise(
    //   resolve => {
    //     setTimeout(() =>resolve(PROMOTIONS.filter((promo)=>promo.featured)[0]),2000);
    //   }
    // );
    // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured )[0]); //promotion.featured === true is same as promotion.featured coz boolean
  }
}
