import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import {AbstractControl,UntypedFormBuilder,UntypedFormGroup,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'add-edit-lookup',
  templateUrl: './add-edit-lookup.component.html',
  styleUrls: ['./add-edit-lookup.component.css']
})
export class AddEditLookupComponent implements OnInit {
  public lookupForm = new UntypedFormGroup({
  });
  public submitted = false;

  @Input() lookupmaster:any;
  Lookup_Id: string = "";
  Lookup_Name: string ="";

	msg = "";
  constructor(private service: SharedService,private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.lookupForm = this.formBuilder.group({
      Lookup_Name: ["", [Validators.required]],
    });

    this.Lookup_Id=this.lookupmaster.Lookup_Id;
    this.Lookup_Name=this.lookupmaster.Lookup_Name;
  }

  get formControl() {
    return this.lookupForm.controls;
  }

  addLookupMaster(){
    this.submitted = true;
    if (this.lookupForm.valid){
    var val = {Lookup_Id:this.Lookup_Id,
      Lookup_Name:this.Lookup_Name,
    };
      this.service.addLookupMaster(val).subscribe(res =>{
        alert(res.toString());
      })
    }
  }

  updateLookupMaster(){
    this.submitted = true;
    if (this.lookupForm.valid){
    var val = {Lookup_Id:this.Lookup_Id,
      Lookup_Name:this.Lookup_Name,
    };
      this.service.updateLookupMaster(val).subscribe(res =>{
        alert(res.toString());
    })
  }
}
}