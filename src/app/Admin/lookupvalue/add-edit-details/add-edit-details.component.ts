import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import { UntypedFormGroup, FormControl, Validators} from '@angular/forms';
import { UntypedFormBuilder } from '@angular/forms';
import { GetColorName } from 'hex-color-to-color-name';



@Component({
  selector: 'add-edit-details',
  templateUrl: './add-edit-details.component.html',
  styleUrls: ['./add-edit-details.component.css']
 
})

export class AddEditDetailsComponent implements OnInit {

  //form: FormGroup;
  LookupName: any =[];

  public LookupValueForm = new UntypedFormGroup({
  });
  public submitted = false;


  @Input() lookupdetail:any;
  Lookup_Details_Id: string ="";
  Lookup_Name: string ="";
  Lookup_Id: string="";
  Description: string ="";

  url: any; 
	msg = "";
  constructor(private service: SharedService, private formBuilder: UntypedFormBuilder) { 
  
  }

  ngOnInit(): void {
    this.LookupValueForm = this.formBuilder.group({
      Lookup_Id: ["", [Validators.required]],
      Description: ["",[ Validators.required]],
   });

    this.Lookup_Details_Id = this.lookupdetail.Lookup_Details_Id;
    this.Lookup_Id = this.lookupdetail.Lookup_Id;
    this.Description = this.lookupdetail.Description;
    this.LookupDetailsList();
  }

  get formControl() {
    return this.LookupValueForm.controls;
  }

  LookupDetailsList() {
    this.service.GetLookupNameDropDown().subscribe(data =>
      this.LookupName = data);
  } 
  
  addLookupDetails(){
    this.submitted = true;
    if (this.LookupValueForm.valid){
    var val = {
      Lookup_Id:this.Lookup_Id,
      Description:this.Description,
      ColorName:GetColorName(this.Description)
    };

      this.service.addLookupDetails(val).subscribe(res =>{
        alert(res.toString());
      })
    }
  }

  updateLookupDetails(){
    this.submitted = true;
    if (this.LookupValueForm.valid){
    var val = {
      Lookup_Details_Id:this.Lookup_Details_Id,
      Lookup_Id:this.Lookup_Id,
      Description:this.Description,
      ColorName:GetColorName(this.Description)
    };
      this.service.updateLookupDetails(val).subscribe(res =>{
        alert(res.toString());
    })
  }
}
}
