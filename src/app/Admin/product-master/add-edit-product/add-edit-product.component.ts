import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
// import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, UntypedFormControl, Validators, FormControl } from '@angular/forms';
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
  });

  public ProductForm = new UntypedFormGroup({
  });

  public submitted = false;

  CategoryName: any = [];
  ColorData: Array<any> = [];
  SizeData: Array<any> = [];
  selectedcolor: any = [];
  selectedsize: any = [];

  @Input() product: any;
  Product_Id: string = "";
  Category_Id: string = "";
  Category_Name: string = "";
  SubCategory_Id: string = "";
  SubCategory: string = "";
  Product_Title: string = "";
  Product_Description: string = "";
  ColorId: any = [];
  SizeId: any = [];
  Image_Name: string = "";
  MenFront_Photo: string = "";
  Product_FrontPhoto: string = "";
  SizeChartForMen: string = "";

  WomenProduct_Description: string = "";
  WomenProduct_Photo: string = "";
  SizeChartForWomen: string = "";


  MenFrontImgFile: any;
  FrontImgFile: any;
  MenSizeChartImgFile: any;

  WomenFrontImgFile: any;
  WomenSizeChartImgFile: any;

  selectedColorIds: any = [];

  @Input() ColorIdList: any;
  Color_CodeId: Array<any> = [];

  menfronturl: any;
  frontphoto_url: any;
  mensizecharturl: any;
  womenfronturl: any;
  womensizecharturl: any;
  msg = "";
  men_f_svgpath: any;
  women_f_svgpath: any;
  MRP: string = "";
  productcategoryfolder: string = "";

  array = [];
  selectedColorArray: any;
  checkboxArray: any;
  Color: any = [];
  Color_string: any;
  Product_Id1: number = 0;
  Size: any = [];
  SizeId_num: any;
  Size_string: any;
  allcolor: any = [];

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
      ColorId: [""],
      SizeId: [""],
      Product_Description: [""],
      WomenProduct_Description: [""],
      men_f_svgpath: [""],
      women_f_svgpath: [""],
      MRP: [""]
    });


    this.Product_Id = this.product.Product_Id,
      this.Product_Id1 = parseInt(this.Product_Id, 10),
      this.Category_Id = this.product.Category_Id;
    this.SubCategory_Id = this.product.SubCategory_Id;
    this.SubCategory = this.product.SubCategory;
    this.Category_Name = this.product.Category_Name;
    this.Category_Name = this.Category_Name.replace(/-/g, ' ').toUpperCase();
    this.productcategoryfolder = this.Category_Name.replace(/\s+/g, '-').toLowerCase();
    this.Product_Title = this.product.Product_Title;
    this.Product_Description = this.product.Product_Description;
    this.Image_Name = this.product.Category_Photo;
    //this.ColorId = this.product.ColorId;
    this.Color = this.product.ColorId;
    if (this.Color.length > 0) {
      this.ColorId = this.Color.split(",").map(Number);
    }
    //  this.array = this.ColorId.split(',');
    this.Size = this.product.SizeId;
    if (this.Size.length > 0) {
      this.SizeId = this.Size.split(",").map(Number);
    }
    this.MenFront_Photo = this.product.Product_Photo;
    this.Product_FrontPhoto = this.product.Product_FrontPhoto;
    this.SizeChartForMen = this.product.SizeChartForMen;
    this.men_f_svgpath = this.product.men_f_svgpath;
    this.WomenProduct_Description = this.product.WomenProduct_Description;
    this.WomenProduct_Photo = this.product.WomenProduct_Photo;
    this.women_f_svgpath = this.product.women_f_svgpath;
    this.SizeChartForWomen = this.product.SizeChartForWomen;
    this.MRP = this.product.MRP;

    this.CategoryNameList();
    this.GetColorList();
    this.GetSizeList();
    //  this.array.forEach((element:any) => { 
    //   this.ColorData.find((data:any)=>{
    //   if(data.Lookup_Details_Id==element){
    //     this.ColorData.push(data.Lookup_Details_Id)
    //   }
    // })
    // })

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



  GetColorList() {
    this.service.GetColor().subscribe((data: any) => {
      this.ColorData = data;

      // this.ColorData.forEach((color) => {
      //   //color.selected = this.array.includes(color.Lookup_Details_Id);
      // });

      // const colorControls = this.ColorData.map((color) => new FormControl(color.selected));

      // this.ProductForm.setControl('ColorId', new FormArray(colorControls));
    })
  }


  GetSizeList() {
    this.service.GetSize().subscribe(data =>
      this.SizeData = data);

  }

  SubCatList: any = [];

  onOptionsSelected(id: any) {

    this.service.GetSubCatByCatid(id).subscribe(data => {
      this.SubCatList = data;
    });
  }



  onSelectChange(e: any) {
    this.ColorId;

    if(this.allcolor.length==0){
      this.allcolor = this.ColorId.map(String);
    }

    let index1 = this.allcolor.indexOf(e.target.value);
    if (index1 == -1) {
      this.allcolor.push(e.target.value);
    }
    else {
      this.allcolor.splice(index1, 1);
    }
    this.allcolor;

    // let index = this.selectedcolor.indexOf(e.target.value);
    // if (index == -1) {
    //   this.selectedcolor.push(e.target.value);
    // }
    // else {
    //   this.selectedcolor.splice(index, 1);
    // }


    // this.selectedcolor.push(this.ColorId);
    // if(this.ColorId!=null){
    // this.clr=(this.selectedcolor.map(Number));
    // this.Color=[...this.ColorId,...this.clr];
    // this.Color_string=this.Color.map(String);
    // }
    // this.ColorId.push(this.selectedcolor.map(Number));
  }


  onSelectSizeChange(e: any) {
    let index = this.selectedsize.indexOf(e.target.value);
    if (index == -1) {
      this.selectedsize.push(e.target.value);
    }
    else {
      this.selectedsize.splice(index, 1);
    }

    if (this.SizeId != null) {
      this.SizeId;
      this.SizeId_num = (this.selectedcolor.map(Number));
      this.SizeId_num;
      this.Size = [...this.SizeId, ...this.SizeId_num];
      this.Size_string = this.Size.map(String);
    }
  }





  addProductDetails() {
    
    this.submitted = true;
    if (this.ProductForm.valid) {
      let formData = new FormData()
      formData.append('Category_Id', this.Category_Id);
      formData.append('SubCategory_Id', this.SubCategory_Id);
      formData.append('Product_Title', this.Product_Title);
      formData.append('Product_Description', this.Product_Description);
      formData.append('ColorId', this.selectedcolor);
      formData.append('SizeId', this.selectedsize);
      formData.append('MenFrontImgFile', this.MenFrontImgFile);
      formData.append('FrontImgFile', this.FrontImgFile);
      formData.append('MRP', this.MRP);
      formData.append('MenSizeChartImgFile', this.MenSizeChartImgFile);
      formData.append('Men_f_svgpath', this.men_f_svgpath);
      formData.append('WomenProduct_Description', this.WomenProduct_Description);
      formData.append('WomenFrontImgFile', this.WomenFrontImgFile);
      formData.append('WomenSizeChartImgFile', this.WomenSizeChartImgFile);
      formData.append('Women_f_svgpath', this.women_f_svgpath);
      this.service.addProductDetails(formData).subscribe(res => {
        alert(res.toString());
      }
      )
    }
  }

  updateProductDetails() {
    
    // this.submitted = true;
    // if (this.ProductForm.valid){
    let formData = new FormData()
    formData.append('Product_Id', this.Product_Id);
    formData.append('Category_Id', this.Category_Id);
    formData.append('SubCategory_Id', this.SubCategory_Id);
    formData.append('Product_Title', this.Product_Title);
    formData.append('Product_Description', this.Product_Description);

    if (this.Color_string.length > 0) {
      formData.append('ColorId', this.Color_string);
    }
    // if (this.ColorId.length > 0) {
    //   formData.append('ColorId', this.ColorId);
    // }
    if (this.selectedcolor.length > 0) {
      formData.append('ColorId', this.selectedcolor);
    }

    if (this.Size_string.length > 0) {
      formData.append('SizeId', this.Size_string);
    }
    if (this.selectedsize.length > 0) {
      formData.append('SizeId', this.selectedsize);
    }

    if (this.MenFrontImgFile != null) {
      formData.append('MenFrontImgFile', this.MenFrontImgFile);
    }
    if (this.MenFrontImgFile == null) {
      if (this.MenFront_Photo != null && this.MenFront_Photo != "") {
        formData.append('updateMenFrontImgFile', this.MenFront_Photo);
      }
    }

    if (this.FrontImgFile != null) {
      formData.append('FrontImgFile', this.FrontImgFile);
    }
    if (this.FrontImgFile == null) {
      if (this.Product_FrontPhoto != null && this.Product_FrontPhoto != "") {
        formData.append('updateFrontImgFile', this.Product_FrontPhoto);
      }
    }

    formData.append('MRP', this.MRP);

    if (this.MenSizeChartImgFile != null) {
      formData.append('MenSizeChartImgFile', this.MenSizeChartImgFile);
    }
    if (this.MenSizeChartImgFile == null) {
      if (this.SizeChartForMen != null && this.SizeChartForMen != "") {
        formData.append('updateMenSizeChartImgFile', this.SizeChartForMen);
      }
    }

    formData.append('Men_f_svgpath', this.men_f_svgpath);
    formData.append('WomenProduct_Description', this.WomenProduct_Description);

    if (this.WomenFrontImgFile != null) {
      formData.append('WomenFrontImgFile', this.WomenFrontImgFile);
    }
    if (this.WomenFrontImgFile == null) {
      if (this.WomenProduct_Photo != null && this.WomenProduct_Photo != "") {
        formData.append('updateWomenFrontImgFile', this.WomenProduct_Photo);
      }
    }

    if (this.WomenSizeChartImgFile != null) {
      formData.append('WomenSizeChartImgFile', this.WomenSizeChartImgFile);
    }
    if (this.WomenSizeChartImgFile == null) {
      if (this.SizeChartForWomen != null && this.SizeChartForWomen != "") {
        formData.append('updateWomenSizeChartImgFile', this.SizeChartForWomen);
      }
    }

    formData.append('Women_f_svgpath', this.women_f_svgpath);
    this.service.updateProductDetails(formData).subscribe(res => {
      alert(res.toString());
    })
    // }
  }



  onselectFile1(event: any, id: any) {
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (e: any) => {
      this.msg = "";
      this.menfronturl = reader.result;
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
        this.frontphoto_url = reader.result;
      }
      this.FrontImgFile = <File>event.target.files[0];
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
        this.mensizecharturl = reader.result;
      }
      this.MenSizeChartImgFile = <File>event.target.files[0];
    }

  }

  onselectFile5(event: any, id: any) {
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

  onselectFile8(event: any, id: any) {
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
}