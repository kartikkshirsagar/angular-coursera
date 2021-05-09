import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import {map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { ProcessHttpMessageService } from './process-http-message.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  feedBack!:Feedback[];
  feedBackCopy!:Feedback[];

  constructor(private http: HttpClient,private phms: ProcessHttpMessageService) { }

  getFeeds(): Observable<Feedback>{
    return this.http.get<Feedback>(baseURL + 'feedback')
    .pipe(catchError(this.phms.handleError));
  }
  submitFeedback(fb : Feedback) : Observable<Feedback>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
      };
      console.log('in submitFeedback');
      console.log(fb);
    return this.http.post<Feedback>(baseURL + 'feedback', fb,httpOptions)
    .pipe(catchError(this.phms.handleError));

  }
}
