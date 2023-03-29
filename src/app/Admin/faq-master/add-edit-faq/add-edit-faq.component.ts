import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import {AbstractControl,UntypedFormBuilder,UntypedFormGroup,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'add-edit-faq',
  templateUrl: './add-edit-faq.component.html',
  styleUrls: ['./add-edit-faq.component.css']
})
export class AddEditFaqComponent implements OnInit {

  form = new UntypedFormGroup({
  });

  public FAQForm = new UntypedFormGroup({
  });
  public submitted = false;

  @Input() faq:any;
  Id:string = "";
  Question: string ="";
  Answer:string ="";

  url: any; 
	msg = "";

  constructor(private service: SharedService, private formBuilder: UntypedFormBuilder) { }



 
  ngOnInit(): void {
    
    this.FAQForm = this.formBuilder.group({
      Question: ["",[ Validators.required]],
      Answer: ["",[ Validators.required]],
    });

    this.Id = this.faq.Id;
    this.Question=this.faq.Question;
    this.Answer=this.faq.Answer;

  }
  get formControl() {
    return this.FAQForm.controls;
  }

  
  addFAQ(){
    this.submitted = true;
    if (this.FAQForm.valid){
    var val = {
     Question:this.Question,
     Answer:this.Answer,
 
    };
      this.service.addFaq(val).subscribe(res =>{
        alert(res.toString());
      })
    }
  }

  updateFAQ(){
    this.submitted = true;
    if (this.FAQForm.valid){
    var val = {
      Id:this.Id,
      Question:this.Question,
      Answer:this.Answer,
    };
      this.service.updateFaq(val).subscribe(res =>{
        alert(res.toString());
    })
   }
  }
}
