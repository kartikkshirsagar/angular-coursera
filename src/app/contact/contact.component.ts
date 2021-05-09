import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Feedback,ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style' : 'display:block',
},
animations:[
  flyInOut.trig
]
})
export class ContactComponent implements OnInit {

  feedbackForm!: FormGroup;
  feedback!:Feedback;
  contactType = ContactType;
  feedbackCopy!:Feedback;
  submitted:boolean = false;
  dataLoaded:boolean = false;
  @ViewChild('fform') feedbackFormDirective: any;

  formErrors: any = {
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':'',
  };

  validationMessages:any = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb:FormBuilder,private feedbackService:FeedbackService) {
    this.createForm();
   }

  ngOnInit(): void {
    // this.feedbackService.getFeeds().subscribe(feed => this.feedbackCopy = feed);
  }
  createForm(): void {
    this.feedbackForm  = this.fb.group({
      firstname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum:[0,[Validators.required,Validators.pattern]],
      email:['',[Validators.required,Validators.email]],
      agree:false,
      contactType: 'None',
      message:['',Validators.required],
    });

    this.feedbackForm.valueChanges.subscribe( data => this.onValueChange(data));
    this.onValueChange(); // reset
  }

  onValueChange(data?:any){
    if(!this.feedbackForm){
      return;
    }
    const form = this.feedbackForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field]='';
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


  onSubmit(){
    this.submitted=true;
    this.feedback = this.feedbackForm.value;
    // this.feedbackCopy=this.feedback;
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      agree:false,
      contactType:'None',
      message:'',
    }); //can be passed an object with default/initial values
    this.feedbackService.submitFeedback(this.feedback)
    .subscribe(data => {this.feedbackCopy=data;this.dataLoaded=true;this.submitted=false;}); //submit on server
    //5 second 
    this.submitted=true;
    this.dataLoaded=false;
    setTimeout(() =>{
      this.submitted=false;
      this.dataLoaded=false;
    } ,5000);
    this.feedbackFormDirective.resetForm();
    console.log(this.feedbackCopy);
  }

}
