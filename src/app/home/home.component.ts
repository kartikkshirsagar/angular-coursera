import { Component, OnInit,Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {Promotion} from '../shared/promotion';
import {Leader} from '../shared/leader';
import { PromotionService } from '../services/promotion.service';
import { DishService } from '../services/dish.service';
import {LeaderService} from '../services/leader.service';
import { flyInOut,expand } from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style' : 'display:block',
},
animations:[
  flyInOut.trig,
  expand.trig
]
})
export class HomeComponent implements OnInit {

  dish!:Dish;
  dishErr!:string;
  promotion!:Promotion;
  promoErr!:string;
  leader!:Leader;
  leaderErr!:string;
  constructor(private promotionService: PromotionService,
              private dishService:DishService,
              private leaderService:LeaderService,
              @Inject('BaseURL') public baseURL:string) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .subscribe((dish) => {this.dish=dish},dishErrMess =>  this.dishErr = <any>dishErrMess);

    this.promotionService.getFeaturedPromotion()
    .subscribe((promo) => {this.promotion=promo});
    
    this.leaderService.getFeaturedLeader()
    .subscribe((promo) => {this.leader=promo});
  }

}
