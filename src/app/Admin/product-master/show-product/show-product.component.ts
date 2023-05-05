import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import { PaginationService } from 'src/app/Services/Api/Admin/pagination.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  ProductList:any = [];
  pageNo: any = 1;  
  pageNumber: boolean[] = [];  
  modalTitle:any;
  activateAddEditProCom:boolean = false;
  activateMultiProCom:boolean=false;
  
  Color_CodeList:any = [];
  ColorIdList :any;

  pageField :any= []; 
  exactPageList: any; 
  paginationData: any; 
  multiProduct:any=[];
  product:any=[]; 
  ProductPerPage: any = 10; 
  totalProduct: any ; 
  totalProductCount: any;
  total:any;

  constructor(private sharedService: SharedService,public paginationService: PaginationService) { }

  ngOnInit(): void {
    this.getAllProduct();
    //this.refreshproductList();
  }

  refreshproductList() {
    this.sharedService.getProductDetailsList().subscribe(data =>{
      this.ProductList = data;
    });

    this.sharedService.GetColorCodeListByProductId(this.product.Product_Id).subscribe(data =>{
      this.Color_CodeList = data;
    });
  }

  getAllProduct() {  
  
   this.sharedService.getProductPagination(this.pageNo, this.ProductPerPage).subscribe((data: any) => { 
     this.ProductList = data;  
     this.getAlltotalProductCount();
   })  
  } 

  getAlltotalProductCount() {
        this.sharedService.getProductCount().subscribe((data: any)=> { 
          this.totalProductCount=data;
          if (this.totalProductCount != null) {
            this.totalProductCount.forEach((element:any) => {
              this.total = element.totalcount;
            })
          }
          this.totalNoOfPages();  
        }) 
    }
        
//Method For Pagination  
totalNoOfPages() { 
    this.paginationData = Number(this.total / this.ProductPerPage);  
    let tempPageData = this.paginationData.toFixed();  
    if (Number(tempPageData) < this.paginationData) {  
      this.exactPageList = Number(tempPageData) + 1;  
      this.paginationService.exactPageList = this.exactPageList;  
    } else {  
      this.exactPageList = Number(tempPageData);  
      this.paginationService.exactPageList = this.exactPageList  
    }  
    this.paginationService.pageOnLoad();  
    this.pageField = this.paginationService.pageField;  
  } 
  
  showProductByPageNumber(page :any, i :any) {  
    this.ProductList = [];  
    this.pageNumber = [];  
    this.pageNumber[i] = true;  
    this.pageNo = page;  
    this.getAllProduct();  
  } 

  MultiProduct(){debugger
    this.multiProduct={
      Product_Id:0,
      Category_Id:"",
      Product_Title:"",
      Image_Name:"",
      Category_Photo:"",
      Category_Name:"",
      SubCategory:"",
      SubCategory_Id:"",
      Product_Description:"",
      TipingId:"",
      SizeId:"",
      Product_Photo:"",
      SizeChartForMen:"",
      WomenProduct_Photo:"",
      SizeChartForWomen:""
    }
    this.modalTitle = "Multi Product"; 
    this.activateMultiProCom = true; 
    this.getAllProduct();
  }

  AddProduct(){
    this.product={
      Product_Id:0,
      Category_Id:"",
      Product_Title:"",
      Image_Name:"",
      Category_Name:"",
      SubCategory:"",
      SubCategory_Id:"",
      Product_Description:"",
      ColorId:"",
      SizeId:"",
      Product_Photo:"",
      // Product_SidePhoto:"",
      // Product_BackPhoto:"",
      SizeChartForMen:"",
      WomenProduct_Description:"",
      WomenProduct_Photo:"",
      // WomenProductSide_Photo:"",
      // WomenProductBack_Photo:"",
      SizeChartForWomen:"",
      men_f_svgpath:"",
      women_f_svgpath:""
    }
    this.modalTitle = "Add Product";
    this.activateAddEditProCom = true;
    this.getAllProduct();
  }

  EditProduct(item: any){
    this.product = item;
    //this.ColorIdList=this.Color_CodeList;
    this.activateAddEditProCom = true;
    this.modalTitle = "Update Product";
    this.getAllProduct();
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteProductDetails(item).subscribe(data =>{
        alert(data.toString());
        this.getAllProduct();
      })
    }
  }
  closeClick(){
    this.activateAddEditProCom=false;
    this.getAllProduct();
  }

  closeClickMulti(){
    this.activateMultiProCom=false;
    this.getAllProduct();
  }
}
