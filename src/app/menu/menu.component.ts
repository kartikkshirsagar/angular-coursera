import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';

import {Dish} from '../shared/dish';
import {DishDetailComponent} from '../dish-detail/dish-detail.component';
import {DishService} from '../services/dish.service';

 @Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes!: Dish[]; 
  selectedDish!: Dish;
  errMess!:string;

  constructor(private dishservice:DishService, @Inject('BaseURL') public BaseURL:string) { }

  ngOnInit(): void {
    this.dishservice.getDishes()
    .subscribe((dishes) => this.dishes=dishes,
    errMess => this.errMess = <any>errMess);
  }

  onSelect(dish:Dish){
    this.selectedDish = dish;
  }
}
