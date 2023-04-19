import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
// import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, UntypedFormControl, Validators } from '@angular/forms';
import { resolve } from 'dns';
import { timeStamp } from 'console';
import { GetColorName } from 'hex-color-to-color-name';


@Component({
  selector: 'add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  form = new UntypedFormGroup({
    ColorData: new UntypedFormControl('', Validators.required),
  });

  public ProductForm = new UntypedFormGroup({
  });

  public submitted = false;

  CategoryName: any = [];
  ColorData: Array<any> = [];
  SizeData: Array<any> = [];
  selectedcolor: any = [];
  selectedsize: any = [];
  //i: any = [];
  //colorName: any = [];

  @Input() product: any;
    Product_Id: string = "";
    Category_Id: string = "";
    Category_Name: string = "";
    SubCategory_Id: string = "";
    SubCategory: string = "";
    Product_Title: string = "";
    Product_Description: string = "";
    ColorId: Array<any> = [];
    SizeId: Array<any> = [];
    Image_Name: string = "";
    MenFront_Photo: string = "";
    MenSide_Photo: string = "";
    MenBack_Photo: string = "";
    SizeChartForMen: string = "";
  
    WomenProduct_Description: string = "";
    WomenProduct_Photo: string = "";
    WomenProductSide_Photo: string = "";
    WomenProductBack_Photo: string = "";
    SizeChartForWomen: string = "";
  
  
    MenFrontImgFile: any;
    MenSideImgFile: any;
    MenBackImgFile: any;
    MenSizeChartImgFile: any;
  
    WomenFrontImgFile: any;
    WomenSideImgFile: any;
    WomenBackImgFile: any;
    WomenSizeChartImgFile: any;
  


  @Input() ColorIdList: any;
  Color_CodeId: Array<any> = [];

  menfronturl: any;
  menbackurl: any;
  mensideurl: any;
  mensizecharturl: any;
  womenfronturl: any;
  womenbackurl: any;
  womensideurl: any;
  womensizecharturl: any;
  msg = "";

  constructor(private service: SharedService, private formBuilder: UntypedFormBuilder) {
    this.form = this.formBuilder.group({
      checkArray: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {

    this.ProductForm = this.formBuilder.group({
            Category_Id: ["", [Validators.required]],
            SubCategory_Id: ["", [Validators.required]],
            Product_Title: ["", [Validators.required]],
            Image_Name: ["", [Validators.required]],
            ColorId: ["", [Validators.required]],
            SizeId: ["", [Validators.required]],
            //i: ["", [Validators.required]],
            Product_Description: ["", [Validators.required]],
          });
      
          debugger
          this.Product_Id = this.product.Product_Id,
          this.Category_Id = this.product.Category_Id;
          this.SubCategory_Id = this.product.Sub_Cat_Id;
          this.Product_Title = this.product.Product_Title;
          this.Product_Description = this.product.Product_Description;
          this.Image_Name = this.product.Category_Photo;
         // this.ColorId = this.product.ColorId;
          this.ColorId = this.product.ColorId;
          this.SizeId =  this.product.SizeId;
          this.MenFront_Photo = this.product.Product_Photo;
          this.MenSide_Photo = this.product.Product_SidePhoto;
          this.MenBack_Photo = this.product.Product_BackPhoto;
          this.SizeChartForMen = this.product.SizeChartForMen;
          this.WomenProduct_Description = this.product.WomenProduct_Description;
          this.WomenProduct_Photo = this.product.WomenProduct_Photo;
          this.WomenProductSide_Photo = this.product.WomenProductSide_Photo;
          this.WomenProductBack_Photo = this.product.WomenProductBack_Photo;
          this.SizeChartForWomen = this.product.SizeChartForWomen;
          
          this.CategoryNameList();
          this.GetColorList();
          this.GetSizeList();
          //this.SubCatLists();
  }

  get formControl() {
    return this.ProductForm.controls;
  }

  CategoryNameList() {

    return new Promise((resolve) => {
      setTimeout(() => {
        this.service.GetProductCatDropDown().subscribe(data =>
          this.CategoryName = data);
      }, 100);
      resolve(this.CategoryName);
    });

    // this.service.GetProductCatDropDown().subscribe(data =>
    //   this.CategoryName = data);

  }



  GetColorList() {debugger
    this.service.GetColor().subscribe((data:any) =>{
      this.ColorData = data;
    }) 
  }


  GetSizeList() {
    this.service.GetSize().subscribe(data =>
      this.SizeData = data);

  }

  SubCatList: any = [];

  onOptionsSelected(id: any) {
    //console.log("the selected value is " + id);

    this.service.GetSubCatByCatid(id).subscribe(data => {
      this.SubCatList = data;
    });
  }

  onSelectChange(e: any) {
    let index = this.selectedcolor.indexOf(e.target.value);
    if (index == -1) {
      this.selectedcolor.push(e.target.value);
    }
    else {
      this.selectedcolor.splice(index, 1);
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


  // addProductDetails(){
  //   //  this.submitted = true;
  //   //  if (this.ProductForm.valid){
  //   //  var val = {
  //   //   Category_Id:this.Category_Id,
  //   //   SubCategory_Id:this.SubCategory_Id,
  //   //   Product_Title:this.Product_Title,
  //   //   Product_Description:this.Product_Description,
  //   //   ColorId:this.selectedcolor,
  //   //   SizeId:this.selectedsize,
  //   //   Image_Name:this.Image_Name.replace(/.*[\/\\]/, ''),
  //   // };
  //   let formData = new FormData()
  //   formData.append('Category_Id', this.Category_Id);
  //   formData.append('SubCategory_Id', this.SubCategory_Id);
  //   formData.append('Product_Title', this.Product_Title);
  //   formData.append('Product_Description', this.Product_Description);
  //   formData.append('ColorId', this.selectedcolor);
  //   formData.append('SizeId', this.selectedsize);
  //   formData.append('formFile', this.selectedFile); 
  //   this.service.addProductDetails(formData).subscribe(res =>{
  //       alert(res.toString());
  //     })
  //   //}
  // }

  // updateProductDetails(){
  //   ;
  //   // var val = {
  //   //   Product_Id:this.Product_Id,
  //   //   Category_Id:this.Category_Id,
  //   //   SubCategory_Id:this.SubCategory_Id,
  //   //   Product_Title:this.Product_Title,
  //   //   Product_Description:this.Product_Description,
  //   //   ColorId:this.selectedcolor,
  //   //   SizeId:this.selectedsize,
  //   //   Image_Name:this.Image_Name.replace(/.*[\/\\]/, ''),
  //   // };
  //   let formData = new FormData()
  //   formData.append('Product_Id', this.Product_Id);
  //   formData.append('Category_Id', this.Category_Id);
  //   formData.append('SubCategory_Id', this.SubCategory_Id);
  //   formData.append('Product_Title', this.Product_Title);
  //   formData.append('Product_Description', this.Product_Description);
  //   formData.append('ColorId[]', this.selectedcolor);
  //   formData.append('SizeId[]', this.selectedsize);
  //   formData.append('formFile', this.selectedFile);

  //   this.service.updateProductDetails(formData).subscribe(res =>{
  //       alert(res.toString());
  //   })
  // }


  addProductDetails() {

    debugger

          let formData = new FormData()
          formData.append('Category_Id', this.Category_Id);
          formData.append('SubCategory_Id', this.SubCategory_Id);
          formData.append('Product_Title', this.Product_Title);
          formData.append('Product_Description', this.Product_Description);
          formData.append('ColorId', this.selectedcolor);
          formData.append('SizeId', this.selectedsize);
          formData.append('MenFrontImgFile', this.MenFrontImgFile);
          formData.append('MenSideImgFile', this.MenSideImgFile);
          formData.append('MenBackImgFile', this.MenBackImgFile);
          formData.append('MenSizeChartImgFile', this.MenSizeChartImgFile);
          formData.append('WomenProductDescription', this.WomenProduct_Description);
          formData.append('WomenFrontImgFile', this.WomenFrontImgFile);
          formData.append('WomenBackImgFile', this.WomenBackImgFile);
          formData.append('WomenSideImgFile', this.WomenSideImgFile);
          formData.append('WomenSizeChartImgFile', this.WomenSizeChartImgFile);
          this.service.addProductDetails(formData).subscribe(res => {
            alert(res.toString());
          })
      }
    
      updateProductDetails() {
    
        let formData = new FormData()
        formData.append('Product_Id', this.Product_Id);
        formData.append('Category_Id', this.Category_Id);
        formData.append('SubCategory_Id', this.SubCategory_Id);
        formData.append('Product_Title', this.Product_Title);
        formData.append('Product_Description', this.Product_Description);
        formData.append('ColorId[]', this.selectedcolor);
        formData.append('SizeId[]', this.selectedsize);
        formData.append('MenFrontImgFile', this.MenFrontImgFile);
        formData.append('MenSideImgFile', this.MenSideImgFile);
        formData.append('MenBackImgFile', this.MenBackImgFile);
        formData.append('MenSizeChartImgFile', this.MenSizeChartImgFile);
        formData.append('WomenProductDescription', this.WomenProduct_Description);
        formData.append('WomenFrontImgFile', this.WomenFrontImgFile);
        formData.append('WomenBackImgFile', this.WomenBackImgFile);
        formData.append('WomenSideImgFile', this.WomenSideImgFile);
        formData.append('WomenSizeChartImgFile', this.WomenSizeChartImgFile);
    
        this.service.updateProductDetails(formData).subscribe(res => {
          alert(res.toString());
        })
      }


      

  //selectFile(event) { //Angular 8
  onselectFile1(event: any,id: any) { //Angular 11, for stricter type

   
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
  onselectFile2(event: any,id: any) { //Angular 11, for stricter type

   
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
            this.mensideurl = reader.result;
          }
          this.MenSideImgFile = <File>event.target.files[0];
        }
    

  }

  onselectFile3(event: any,id: any) { //Angular 11, for stricter type

   
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
        this.menbackurl = reader.result;
      }
      this.MenBackImgFile = <File>event.target.files[0];
    }

  }

  onselectFile4(event: any,id: any) { //Angular 11, for stricter type

   
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
        this.mensizecharturl = reader.result;
      }
      this.MenSizeChartImgFile = <File>event.target.files[0];
    }

  }

  onselectFile5(event: any,id: any) { //Angular 11, for stricter type

   
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (id == 5) {
      reader.onload = (_event) => {
        this.msg = "";
        this.womenfronturl = reader.result;
      }
      this.WomenFrontImgFile = <File>event.target.files[0];
    }

  }

  onselectFile6(event: any,id: any) { //Angular 11, for stricter type

   
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (id == 6) {
      reader.onload = (_event) => {
        this.msg = "";
        this.womensideurl = reader.result;
      }
      this.WomenSideImgFile = <File>event.target.files[0];
    }

  }

  onselectFile7(event: any,id: any) { //Angular 11, for stricter type

   
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (id == 7) {
      reader.onload = (_event) => {
        this.msg = "";
        this.womenbackurl = reader.result;
      }
      this.WomenBackImgFile = <File>event.target.files[0];
    }

  }

  onselectFile8(event: any,id: any) { //Angular 11, for stricter type

   
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    if (id == 8) {
      reader.onload = (_event) => {
        this.msg = "";
        this.womensizecharturl = reader.result;
      }
      this.WomenSizeChartImgFile = <File>event.target.files[0];
    }

  }

  // onselectFile9(event: any,id: any) { //Angular 11, for stricter type

   
  //   var mimeType = event.target.files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.msg = "Only images are supported";
  //     return;
  //   }

  //   var reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   if (id == 9) {
  //     reader.onload = (_event) => {
  //       this.msg = "";
  //       this.menfronturl = reader.result;
  //     }
  //     this.MenFrontImgFile = <File>event.target.files[0];
  //   }

  // }
}