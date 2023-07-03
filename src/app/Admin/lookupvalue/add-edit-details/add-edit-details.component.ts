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
  selectedFile:any;
  tipping_img:string="";

  url: any; 
	msg = "";
  ColorName: any;
  constructor(private service: SharedService, private formBuilder: UntypedFormBuilder) { 
  
  }

  ngOnInit(): void {
    this.LookupValueForm = this.formBuilder.group({
      // Lookup_Id: ["", [Validators.required]],
      Lookup_Id: [""],
      Description: ["",[ Validators.required]]
      // tipping_img: [""]
   });

    this.Lookup_Details_Id = this.lookupdetail.Lookup_Details_Id;
    this.Lookup_Id = this.lookupdetail.Lookup_Id;
    this.Description = this.lookupdetail.Description;
    this.tipping_img = this.lookupdetail.tipping_img;
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
      if (this.Lookup_Id!="3"){
        this.ColorName=GetColorName(this.Description)

        let formData = new FormData()
        formData.append('Lookup_Id', this.Lookup_Id);
        formData.append('Description', this.Description);
        formData.append('ColorName', this.ColorName);
        
        this.service.addLookupDetails(formData).subscribe(res =>{
          alert(res.toString());
        })
      }
      else{
        this.ColorName=GetColorName(this.Description)

        let formData = new FormData()
        formData.append('Lookup_Id', this.Lookup_Id);
        formData.append('Description', this.Description);
        formData.append('ColorName', this.ColorName);
        formData.append('formFile', this.selectedFile);
        this.service.addLookupDetails(formData).subscribe(res =>{
          alert(res.toString());
        })
      }
    }
  }
  

  updateLookupDetails(){
    this.submitted = true;
    if (this.LookupValueForm.valid){
    if (this.Lookup_Id!="3"){
      this.ColorName=GetColorName(this.Description)

      let formData = new FormData()
      formData.append('Lookup_Details_Id', this.Lookup_Details_Id);
      formData.append('Lookup_Id', this.Lookup_Id);
      formData.append('Description', this.Description);
      formData.append('ColorName', this.ColorName);
      
      this.service.updateLookupDetails(formData).subscribe(res =>{
        alert(res.toString());
      })
    }
    else{
      this.ColorName=GetColorName(this.Description)

      let formData = new FormData()
      formData.append('Lookup_Details_Id', this.Lookup_Details_Id);
      formData.append('Lookup_Id', this.Lookup_Id);
      formData.append('Description', this.Description);
      formData.append('ColorName', this.ColorName);
      formData.append('formFile', this.selectedFile);
      this.service.updateLookupDetails(formData).subscribe(res =>{
        alert(res.toString());
      })
    }
  }
  }


  onselectFile(event: any) { 
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