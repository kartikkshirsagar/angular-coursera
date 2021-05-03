import {Comment} from './comment';
export class Dish{
    id!: string; // ! is a ts literal which tells bascally that this variable will have a value at runtime
    name!: string;
    image!: string;
    category!: string;
    featured!: boolean;
    label!: string;
    description!: string;
    price!:string;
    comments!:Comment[];

}