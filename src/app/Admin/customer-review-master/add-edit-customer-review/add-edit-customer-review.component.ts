import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import {AbstractControl,UntypedFormBuilder,UntypedFormGroup,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'add-edit-customer-review',
  templateUrl: './add-edit-customer-review.component.html',
  styleUrls: ['./add-edit-customer-review.component.css']
})

export class AddEditCustomerReviewComponent implements OnInit {

  public reviewForm = new UntypedFormGroup({
  });
  public submitted = false;

  @Input() cust_review:any;
  Customer_Review_Id:string = "";
  Client_Name: string ="";
  Profession: string ="";
  Review: string ="";
  Client_Photo: string ="";
  Rating: string ="";
  selectedFile:any;
 
  url: any; 
	msg = "";

  constructor(private service: SharedService,private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    this.reviewForm = this.formBuilder.group({
      Client_Name: ["", [Validators.required]],
      Profession: [""],
      Review: ["",[ Validators.required]],
      // Client_Photo: ["",[ Validators.required]],
      Client_Photo: [""],
      Rating: ["",[ Validators.required]],
    });

    this.Customer_Review_Id=this.cust_review.Customer_Review_Id;
    this.Client_Name=this.cust_review.Client_Name;
    this.Profession=this.cust_review.Profession;
    this.Review=this.cust_review.Review;
    this.Client_Photo=this.cust_review.Client_Photo;
    this.Rating=this.cust_review.Rating;
  }

  get formControl() {
    return this.reviewForm.controls;
  }

  addCust_Review(){debugger
    this.submitted = true;
    if (this.reviewForm.valid){
      let formData = new FormData()
      formData.append('Client_Name', this.Client_Name);
      formData.append('Profession', this.Profession);
      formData.append('Review', this.Review);
      formData.append('Rating', this.Rating);
      formData.append('formFile', this.selectedFile);
      this.service.addCustomerReview(formData).subscribe(res =>{
        alert(res.toString());
      })
    }
  }

  updateCust_Review(){debugger
    this.submitted = true;
    if (this.reviewForm.valid){
    let formData = new FormData()
    formData.append('Customer_Review_Id', this.Customer_Review_Id);
    formData.append('Client_Name', this.Client_Name);
    formData.append('Profession', this.Profession);
    formData.append('Review', this.Review);   
    formData.append('Rating', this.Rating);
    if(this.selectedFile==undefined){
      if(this.Client_Photo!=null){
        formData.append('update_imageName', this.Client_Photo);
      }
    }
      if(this.selectedFile!=null && this.selectedFile!=""){
      formData.append('formFile', this.selectedFile);
      }
      this.service.updateCustomerReview(formData).subscribe(res =>{
        alert(res.toString());
    })
  }
  }

	
	onselectFile_customer(event: any) { 
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}

    this.selectedFile=<File>event.target.files[0];
  }
}

