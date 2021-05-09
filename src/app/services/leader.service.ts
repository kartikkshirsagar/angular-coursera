import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
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
export class LeaderService {

  constructor(private http: HttpClient,private phms:ProcessHttpMessageService) { }
  
  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.phms.handleError));

    
    // return new Promise(
    //   (resolve) => {
    //   setTimeout(() =>resolve(LEADERS),2000);
    // });
    // return Promise.resolve(LEADERS);
  }

  getLeader(id:string): Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.phms.handleError));

    // return new Promise(
    //   resolve => {
    //     setTimeout(() =>resolve(LEADERS.filter((leader)=>leader.id === id)[0]),2000);
    //   }
    // );
    // return Promise.resolve(LEADERS.filter((leader)=>leader.id === id)[0]);
  }

  getFeaturedLeader(): Observable<Leader>{
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
    .pipe(map(leader => leader[0]),catchError(this.phms.handleError));
    
    // return new Promise(
    //   resolve => {
    //     setTimeout(() =>resolve(LEADERS.filter((leader)=>leader.featured)[0]),2000);
    //   }
    // );
    // return Promise.resolve(LEADERS.filter((leader)=>leader.featured)[0]);
  }


}
