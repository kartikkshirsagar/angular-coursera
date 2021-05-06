import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {Promotion} from '../shared/promotion';
import {Leader} from '../shared/leader';
import { PromotionService } from '../services/promotion.service';
import { DishService } from '../services/dish.service';
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish!:Dish;
  promotion!:Promotion;
  leader!:Leader;
  constructor(private promotionService: PromotionService,
              private dishService:DishService,
              private leaderService:LeaderService) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .then((dish) => {this.dish=dish});

    this.promotionService.getFeaturedPromotion()
    .then((promo) => {this.promotion=promo});
    
    this.leaderService.getFeaturedLeader()
    .then((promo) => {this.leader=promo});
  }

}
