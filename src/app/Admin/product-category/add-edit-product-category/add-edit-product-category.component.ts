import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import {AbstractControl,UntypedFormBuilder,UntypedFormGroup,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'add-edit-product-category',
  templateUrl: './add-edit-product-category.component.html',
  styleUrls: ['./add-edit-product-category.component.css']
})
export class AddEditProductCategoryComponent implements OnInit {
  public Pro_CatForm = new UntypedFormGroup({
  });
  public submitted = false;

  @Input() productcategory:any;
  Category_Id:string = "";
  Category_Name: string ="";
  Category_Description: string ="";
  Category_Photo: string ="";
  selectedFile:any;

 
  url: any; 
	msg = "";

  constructor(private service: SharedService, private formBuilder: UntypedFormBuilder ) { }

  ngOnInit(): void {
    this.Pro_CatForm = this.formBuilder.group({
      Category_Name: ["", [Validators.required]],
      Category_Description: ["",[ Validators.required]],
      Category_Photo: ["",[ Validators.required]],
    });
    this.Category_Id = this.productcategory.Category_Id;
    this.Category_Name = this.productcategory.Category_Name;
    this.Category_Description = this.productcategory.Category_Description;
    this.Category_Photo = this.productcategory.Category_Photo;
  }

  get formControl() {
    return this.Pro_CatForm.controls;
  }
  addProductCategory(){debugger
    
    this.submitted = true;
    if (this.Pro_CatForm.valid){
    // var val = {Category_Id:this.Category_Id,
    //   Category_Name:this.Category_Name,
    //   Category_Description:this.Category_Description,
    //   Category_Photo:this.Category_Photo.replace(/.*[\/\\]/, '')
    // };
    let formData = new FormData()
    formData.append('Category_Name', this.Category_Name);
    formData.append('Category_Description', this.Category_Description);
    formData.append('formFile', this.selectedFile);
      this.service.addProductcategory(formData).subscribe(res =>{
        alert(res.toString());
      })
    }
  }

  updateProductCategory(){
    this.submitted = true;
    if (this.Pro_CatForm.valid){
      let formData = new FormData()
      formData.append('Category_Id', this.Category_Id);
      formData.append('Category_Name', this.Category_Name);
      formData.append('Category_Description', this.Category_Description);
      formData.append('formFile', this.selectedFile);
    // var val = {Category_Id:this.Category_Id,
    //   Category_Name:this.Category_Name,
    //   Category_Description:this.Category_Description,
    //   Category_Photo:this.Category_Photo,
    // };
      this.service.updateProductcategory(formData).subscribe(res =>{
        alert(res.toString());
    })
  }
  }
	
	//selectFile(event) { //Angular 8
	onselectFile(event: any) { //Angular 11, for stricter type
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