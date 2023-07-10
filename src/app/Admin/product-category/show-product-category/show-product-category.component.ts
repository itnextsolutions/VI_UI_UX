import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import { PaginationService } from 'src/app/Services/Api/Admin/pagination.service';

@Component({
  selector: 'app-show-product-category',
  templateUrl: './show-product-category.component.html',
  styleUrls: ['./show-product-category.component.css']
})

export class ShowProductCategoryComponent implements OnInit {
  productcategoryList:any = [];
  pageNo: any = 1;  
  pageNumber: boolean[] = [];  

  modalTitle:any;
  activateAddEditProCatCom:boolean = false;
  productcategory:any;
  
  
  pageField :any= []; 
  exactPageList: any; 
  paginationData: any;
  ProductCategoryPerPage: any = 10; 
  totalProductCategory: any ; 
  totalProductCategoryCount: any;
  total:any;

  constructor(private sharedService: SharedService,public paginationService: PaginationService) { }

  ngOnInit(): void {
   // this.refreshproductcategoryList();
    this.getAllProductCategory();
  }

  refreshproductcategoryList() {
    this.sharedService.getproductcategoryList().subscribe(data =>{
      this.productcategoryList = data;
    });
  }

  getAllProductCategory() {  
   this.sharedService.getProductCategoryPagination(this.pageNo, this.ProductCategoryPerPage).subscribe((data: any) => { 
     this.productcategoryList = data;  
      this.getAlltotalProductCategoryCount();
   })  
  } 

  getAlltotalProductCategoryCount() {
        this.sharedService.getProductCategoryCount().subscribe((data: any)=> { 
          this.totalProductCategoryCount=data;
          if (this.totalProductCategoryCount != null) {
            this.totalProductCategoryCount.forEach((element:any) => {
              this.total = element.totalcount;
            })
          }
          this.totalNoOfPages();  
        })  
    }

     
//Method For Pagination  

totalNoOfPages() { 
  this.paginationData = Number(this.total / this.ProductCategoryPerPage);  
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
  
  isShowDivIf:boolean=false;
  toggleDisplayDiv ()
  {
     this.isShowDivIf = !this.isShowDivIf;  
  }
  
  showProductByPageNumber(page :any, i :any) {  
  this.productcategoryList = [];  
  this.pageNumber = [];  
  this.pageNumber[i] = true;  
  this.pageNo = page;  
  this.getAllProductCategory();  
  }  

  AddProductCategory(){
    this.productcategory={
      Category_Id:0,
      Category_Name:"",
      Category_Description:"",
      Category_Photo:"",
      IsBrand:""
    }
    this.modalTitle = "Add Product Category";
    this.activateAddEditProCatCom = true;
    
  }

  EditProductCategory(item: any){
    this.productcategory = item;
    this.activateAddEditProCatCom = true;
    this.modalTitle = "Update Product Category";
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteProductcategory(item).subscribe(data =>{
        alert(data.toString());
        this.refreshproductcategoryList();
      })
    }
  }

  closeClick(){
    this.activateAddEditProCatCom=false;
    this.refreshproductcategoryList();
  }
}