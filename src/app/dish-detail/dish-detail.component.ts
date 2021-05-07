import { Component, OnInit,Input, ViewChild } from '@angular/core';
import {Dish} from '../shared/dish';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DishService} from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {Comment} from '../shared/comment';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

    dish!:Dish;
    dishIds!:string[];
    prev!:string;
    next!:string;
    commentForm!:FormGroup;
    comment!:Comment;

    formErrors: any = {
      'author':'',
      'rating':'',
      'comment':'',
    };
    validationMessages:any = {
      'author': {
        'required': 'Name is required.',
        'minlength': 'Name must be at least 2 characters long.',
        'maxlength': 'Name cannot be more than 40 characters long.'
      },
      'rating':{

      },
      'comment': {
        'required': 'Comment is required.',
        'minlength':      'Comment must be at least 2 characters long',
        'maxlength':      'Comment cannot be more than 256 characters.'
      },
    };

    @ViewChild('cform') commentFormDirective: any;

    constructor(private dishService:DishService,private location:Location,private route:ActivatedRoute,private fb: FormBuilder) {
      this.createForm();
     }
     createForm(){
       this.commentForm = this.fb.group({
        author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(40)]],
        rating:0,
        comment:['',[Validators.required,Validators.minLength(2),Validators.maxLength(150)]]
       });
       this.commentForm.valueChanges.subscribe(data => this.valueChange(data));
       this.valueChange();

     }

    ngOnInit(): void {
      this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);

      let id = this.route.params
      .pipe(switchMap((params:Params) => this.dishService.getDish(params['id']))) //get id from /dishdetail/'id'
      .subscribe((dish) => {
        this.dish=dish;
        this.setPrevNext(dish.id);
      });
    }

    setPrevNext(dishId:string){
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length+index+1)%this.dishIds.length];
    }
    goBack(): void{
      this.location.back();
    }
    onSubmit(){
      this.comment = this.commentForm.value;
      this.commentForm.reset({
      author:'',
      rating:0,
      comment:'',
      });
      this.commentFormDirective.reset();
      const com = {
        rating: this.comment.rating,
        comment: this.comment.comment,
        author: this.comment.author,
        date:new Date().toISOString(),
      }
      this.dish.comments.push(com);
    }

    valueChange(data?:any){
      if(!this.commentForm){
        return;
      }
      const form = this.commentForm;
      for(const field in this.formErrors){
        if(this.formErrors.hasOwnProperty(field)){
          this.formErrors[field] = '';
          const control = form.get(field);
          if(control && control.dirty && !control.valid){
            const messages = this.validationMessages[field];
            for(const key in control.errors){
              if(control.errors.hasOwnProperty(key)){
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          } 
        }
      }
    }
}
