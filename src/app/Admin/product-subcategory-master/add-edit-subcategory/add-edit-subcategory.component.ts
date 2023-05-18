import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import {AbstractControl,UntypedFormBuilder,UntypedFormGroup,Validators,FormControl} from '@angular/forms';

@Component({
  selector: 'add-edit-subcategory',
  templateUrl: './add-edit-subcategory.component.html',
  styleUrls: ['./add-edit-subcategory.component.css']
})
export class AddEditSubcategoryComponent implements OnInit {

  form = new UntypedFormGroup({
  });

  public Pro_SubCatForm = new UntypedFormGroup({
  });
  public submitted = false;

  CategoryName: any =[];

  @Input() subcategory:any;
  SubCategory_Id:string="";
  Category_Id: string ="";
  Sub_Cat_Name: string ="";


  url: any; 
	msg = "";
  SubCategory:string ="";
  // SubCategory_Id: string="";

  constructor(private service: SharedService,private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    this.Pro_SubCatForm = this.formBuilder.group({
       Category_Id: ["", [Validators.required]],
      Sub_Cat_Name: ["",[ Validators.required]],
      // Sub_Cat_Photo: ["",[ Validators.required]],
    });
    this.SubCategory_Id = this.subcategory.SubCategory_Id;
    // this.SubCategory_Id = this.subcategory.SubCategory_Id;
    this.Category_Id =this.subcategory.Category_Id;
    this.SubCategory = this.subcategory.SubCategory;
    this.CategoryNameList();
  }
  

  CategoryNameList() {
    this.service.GetProductCatDropDown().subscribe(data =>
      this.CategoryName = data);
  } 

  get formControl() {
    return this.Pro_SubCatForm.controls;
  }

  addSubProductCategory(){
    
    this.submitted = true;
    // if (this.Pro_SubCatForm.valid){
    // var val = {
    //   // SubCategory_Id:this.SubCategory_Id,
    //   Category_Id:this.Category_Id,
    //   Sub_Cat_Name:this.Sub_Cat_Name
    //   // SubCategory:this.Sub_Cat_Name,
    //   // Sub_Cat_Photo:this.Sub_Cat_Photo.replace(/.*[\/\\]/, '')
    // };
    let formData = new FormData()
    // formData.append('SubCategory_Id', this.SubCategory_Id);
        formData.append('Category_Id', this.Category_Id);
        formData.append('SubCategory', this.SubCategory);
      
    // }
    this.service.addSubProductcategory(formData).subscribe(res =>{
      alert(res.toString()); 
    })
  }

  updateSubProductCategory(){
    
    this.submitted = true;
    if (this.Pro_SubCatForm.valid){
    // var val = {
    //   Id : this.Id,
    //   // SubCategory_Id : this.SubCategory_Id,
    //   Category_Id:this.Category_Id,
    //   Sub_Cat_Name:this.Sub_Cat_Name,
    //   // Sub_Cat_Photo:this.Sub_Cat_Photo.replace(/.*[\/\\]/, '')
    // };
    let formData = new FormData()
    formData.append('SubCategory_Id', this.SubCategory_Id);
        formData.append('Category_Id', this.Category_Id);
        formData.append('SubCategory', this.SubCategory);
      this.service.updateSubProductcategory(formData).subscribe(res =>{
        alert(res.toString());
    })
   }
  }

  
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
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
  }
}
