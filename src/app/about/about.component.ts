import { Component, OnInit } from '@angular/core';
import {LeaderService} from '../services/leader.service';
import {Leader} from '../shared/leader';
import { flyInOut,expand } from '../animations/app.animation';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style' : 'display:block',
},
animations:[
  flyInOut.trig,
  expand.trig
]
})
export class AboutComponent implements OnInit {

  leaders!: Leader[];
  constructor(private leaderService: LeaderService,@Inject('BaseURL') public baseURL:string) { }

  ngOnInit(): void {
     this.leaderService.getLeaders()
    .subscribe((leaders) => this.leaders=leaders);
  }

}
