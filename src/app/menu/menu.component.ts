import { Component, OnInit } from '@angular/core';


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

  constructor(private dishservice:DishService) { }

  ngOnInit(): void {
    this.dishservice.getDishes()
    .subscribe((dishes) => this.dishes=dishes);
  }

  onSelect(dish:Dish){
    this.selectedDish = dish;
  }
}
