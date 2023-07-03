import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-multi-product',
  templateUrl: './multi-product.component.html',
  styleUrls: ['./multi-product.component.css']
})




export class MultiProductComponent implements OnInit {

  form = new UntypedFormGroup({

  });

  public ProductForm = new UntypedFormGroup({
  });

  // ProductForm:FormGroup;

  public submitted = false;

  @Input() multiProduct: any;

  Product_Id: string = "";
  Category_Id: string = "";
  Category_Name: string = "";
  SubCategory_Id: string = "";
  SubCategory: string = "";
  Product_Title: string = "";
  Product_Description: string = "";
  TipingId: any = [];
  SizeId: any = [];
  MenFront_Photo: string = "";
  SizeChartForMen: string = "";
  WomenProduct_Photo: string = "";
  SizeChartForWomen: string = "";

  MenFrontImgFile: any = [];
  MenImgFile:any=[];
  MenSizeChartImgFile: any;
  WomenFrontImgFile: any = [];
  WomenImgFile:any=[];
  WomenSizeChartImgFile: any;

  CategoryName: any;
  TippingData: any;
  SizeData: any;
  selectedMenTipping: any = [];

  selectedMenImages: any = [];

  selectedsize: any = [];
  SubCatList: any;

  menfronturl: any;
  mensizecharturl: any;
  womenfronturl: any;
  womensizecharturl: any;
  msg = "";
  LookupId: any;
  subscriptions: any;

  Select: any;
  FrontImgFile: any=[];
  Documents: any=[];
  selectedWomenImages: any=[];
  i:any;
  totaltipping:number=0;
  totalMenImages: number=0;
  totalWomenImages: number=0;
  selectedWomenTipping: any=[];
  WomenTippingData: any;
  MRP: string="";


  constructor(private service: SharedService, private formBuilder: UntypedFormBuilder) {
    this.form = this.formBuilder.group({
      // checkArray: this.formBuilder.array([])
    })

  }


  ngOnInit(): void {

   this.Product_Id = this.multiProduct.Product_Id,
    this.Category_Id = this.multiProduct.Category_Id;
    this.SubCategory_Id = this.multiProduct.SubCategory_Id;
    this.Product_Title = this.multiProduct.Product_Title;
    this.Product_Description = this.multiProduct.Product_Description;
    this.TipingId = this.multiProduct.TipingId;
    this.SizeId = this.multiProduct.SizeId;
    this.MenFront_Photo = this.multiProduct.Product_Photo;
    this.SizeChartForMen = this.multiProduct.SizeChartForMen;
    this.WomenProduct_Photo = this.multiProduct.WomenProduct_Photo;
    this.SizeChartForWomen = this.multiProduct.SizeChartForWomen;
    this.MRP=this.multiProduct.MRP;
    this.CategoryNameList();
    this.GetTippingImg();
    this.GetSizeList();
    this.InitialFrom();
  }



  InitialFrom(): void {


    this.ProductForm = this.formBuilder.group({
      Category_Id: ["", [Validators.required]],
      SubCategory_Id: ["", [Validators.required]],
      Product_Title: ["", [Validators.required]],
      Product_Description: [""],
      SizeId: [""],
      Images: this.formBuilder.array([]),
      WomenImages:this.formBuilder.array([]),
      MRP:[""]
    });
  }


  get Images(): FormArray {
    return this.ProductForm.get("Images") as FormArray
  }

  get WomenImages(): FormArray {
    return this.ProductForm.get("WomenImages") as FormArray
  }

  newQuantity(): FormGroup {
    return this.formBuilder.group({
      TipingId: "",
      MenFrontImgFile:  "",
    })
  }

  womenImages(): FormGroup {
    return this.formBuilder.group({
      TipingWomenId: "",
      WomenFrontImgFile: ""
    })
  }


  addImages() {
    this.Images.push(this.newQuantity());
  }

  addWomenImages() {
    this.WomenImages.push(this.womenImages());
  }



  removeImages(i: number) {
    this.Images.removeAt(i);
  }

  removeWomenImages(i: number) {
    this.WomenImages.removeAt(i);
  }

 

  get formControl() {
    return this.ProductForm.controls;
  }

  onFileChange(event:any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const control = this.formBuilder.control(file);
       this.MenFrontImgFile = <File>event.target.files[0];
      // (this.ProductForm.get('Images') as FormArray).push(control);
       this.Images.push( this.MenFrontImgFile);

    
    }
  }

  CategoryNameList() {

    return new Promise((resolve) => {
      setTimeout(() => {
        this.service.GetProductCatDropDown().subscribe(data =>
          this.CategoryName = data);
      }, 100);
      resolve(this.CategoryName);
    });
  }

  GetTippingImg() {
    this.service.GetTipping().subscribe((data: any) =>
      this.TippingData = data);
     
  }

  GetSizeList() {
    this.service.GetSize().subscribe(data =>
      this.SizeData = data);

  }


  onOptionsSelected(id: any) {

    this.service.GetSubCatByCatid(id).subscribe(data => {
      this.SubCatList = data;
    });
  }

  onSelectChange(e: any) {
    
    let index = this.selectedMenTipping.indexOf(e.target.value);
    if (index == -1) {
      this.selectedMenTipping.push(e.target.value);

    }
    else {
      this.selectedMenTipping.splice(index, 1);
    }
  
   
  }

  onWOmenTippingChange(e: any) {
    
    let index = this.selectedWomenTipping.indexOf(e.target.value);
    if (index == -1) {
      this.selectedWomenTipping.push(e.target.value);

    }
    else {
      this.selectedWomenTipping.splice(index, 1);
    }
  
   
  }




  onSelectSizeChange(e: any) {
    let index = this.selectedsize.indexOf(e.target.value);
    if (index == -1) {
      this.selectedsize.push(e.target.value);
    }
    else {
      this.selectedsize.splice(index, 1);
    }
    
  }


  multiProductDetails() {
    this.submitted = true;
    if (this.ProductForm.valid){
          let formData = new FormData()
          formData.append('Category_Id', this.Category_Id);
          formData.append('SubCategory_Id', this.SubCategory_Id);
          formData.append('Product_Title', this.Product_Title);
          formData.append('Product_Description', this.Product_Description);
          formData.append('SizeId', this.selectedsize);
          formData.append('MRP',this.MRP);
            for (let i = 0; i < this.selectedMenTipping.length; i++) {
              formData.append('TipingId', this.selectedMenTipping[i]);
            }
          
            for (let i = 0; i < this.selectedWomenTipping.length; i++) {
              formData.append('TipingWomenId', this.selectedWomenTipping[i]);
            }

            for (let i = 0; i < this.selectedMenImages.length; i++) {
              formData.append('MenImgFiles', this.selectedMenImages[i]);
            }

            for (let i = 0; i < this.selectedWomenImages.length; i++) {
              formData.append('WomenImgFiles', this.selectedWomenImages[i]);
            }
          formData.append('MenFrontImgFile', this.MenFrontImgFile);
          formData.append('MenSizeChartImgFile', this.MenSizeChartImgFile);
          formData.append('WomenFrontImgFile', this.WomenFrontImgFile);
          formData.append('WomenSizeChartImgFile', this.WomenSizeChartImgFile);
          this.service.multiProductDetails(formData).subscribe(res => {
            alert(res.toString());

          })
        }
          
      }


  onMultiMenFile(event: any) { 
   
    let index = this.selectedMenImages.indexOf(event.target.files[0]);
    if (index == -1) {

    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.msg = "";
      }
      this.MenImgFile = <File>event.target.files[0];
    // }

    this.selectedMenImages.push(this.MenImgFile);
    
  }

  }

  onselectFile1(event: any, id: any) {


    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (id == 1) {
      reader.onload = (_event) => {
        this.msg = "";
        this.menfronturl = reader.result;
      }
      this.MenFrontImgFile = <File>event.target.files[0];
    }
  }

  onselectFile2(event: any, id: any) {


    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (id == 2) {
      reader.onload = (_event) => {
        this.msg = "";
        this.mensizecharturl = reader.result;
      }
      this.MenSizeChartImgFile = <File>event.target.files[0];
    }
  }

  onMultiWomenFile(event: any) { 
    // if(id=="i"){
      let index = this.selectedWomenImages.indexOf(event.target.files[0]);
      if (index == -1) {
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

      reader.onload = (_event) => {
        this.msg = "";
      }
      this.WomenImgFile = <File>event.target.files[0];
    // }
    this.selectedWomenImages.push(this.WomenImgFile);
  }
  }

  onselectFile3(event: any, id: any) {


    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (id == 3) {
      reader.onload = (_event) => {
        this.msg = "";
        this.womenfronturl = reader.result;
      }
      this.WomenFrontImgFile = <File>event.target.files[0];
    }
  }

  onselectFile4(event: any, id: any) {


    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (id == 4) {
      reader.onload = (_event) => {
        this.msg = "";
        this.womensizecharturl = reader.result;
      }
      this.WomenSizeChartImgFile = <File>event.target.files[0];
    }
  }
}
