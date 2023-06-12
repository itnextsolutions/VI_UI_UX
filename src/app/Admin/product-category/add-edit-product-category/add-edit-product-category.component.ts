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
  Is_Brand:any;
  IsChecked:boolean=false;
 
  url: any; 
	msg = "";

  constructor(private service: SharedService, private formBuilder: UntypedFormBuilder ) { }

  ngOnInit(): void {
    this.Pro_CatForm = this.formBuilder.group({
      Category_Name: ["", [Validators.required]],
      Category_Description: ["",[ Validators.required]],
      Category_Photo: ["",[ Validators.required]],
      Is_Brand:[""]
    });
    this.Category_Id = this.productcategory.Category_Id;
    this.Category_Name = this.productcategory.Category_Name;
    this.Category_Description = this.productcategory.Category_Description;
    this.Is_Brand=this.productcategory.Is_Brand;
    this.Category_Photo = this.productcategory.Category_Photo;
  }

  get formControl() {
    return this.Pro_CatForm.controls;
  }
  addProductCategory(){
    
    this.submitted = true;
    if (this.Pro_CatForm.valid){
    // var val = {Category_Id:this.Category_Id,
    //   Category_Name:this.Category_Name,
    //   Category_Description:this.Category_Description,
    //   formFile:this.selectedFile
    // };
    let formData = new FormData()
    formData.append('Category_Name', this.Category_Name);
    formData.append('Category_Description', this.Category_Description);
    formData.append('formFile', this.selectedFile);
    formData.append('IsBrand',this.Is_Brand)
      // formData.has('IsBrand');this.IsChecked;
      this.service.addProductcategory(formData).subscribe(res =>{
        alert(res.toString());
      })
    }
  }

  onSelectChange(e: any) {
    if (this.Is_Brand==true){
      this.Is_Brand=1;
    }
    else{
      this.Is_Brand=0
    }
    // let index = this.Is_Brand.indexOf(e.target.value);
    // if (index == -1) {
    //   this.Is_Brand.push(e.target.value);
    // }
    // else {
    //   this.Is_Brand.splice(index, 1);
    // }
  }

  onClick(e: any) {
   this.IsChecked=e;
  }

  updateProductCategory(){
    this.submitted = true;
    // if (this.Pro_CatForm.valid){
      let formData = new FormData()
      formData.append('Category_Id', this.Category_Id);
      formData.append('Category_Name', this.Category_Name);
      formData.append('Category_Description', this.Category_Description);
      formData.append('formFile', this.selectedFile);
      if(this.Is_Brand!=null && this.Is_Brand!=undefined)
      {
        formData.append('IsBrand',this.Is_Brand)
      }
      else
      {
        formData.append('IsBrand','0')
      }
    // var val = {Category_Id:this.Category_Id,
    //   Category_Name:this.Category_Name,
    //   Category_Description:this.Category_Description,
    //   Category_Photo:this.Category_Photo,
    // };
      this.service.updateProductcategory(formData).subscribe(res =>{
        alert(res.toString());
    })
  // }
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