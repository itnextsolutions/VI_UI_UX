import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import { PaginationService } from 'src/app/Services/Api/Admin/pagination.service';
import { debug } from 'console';

@Component({
  selector: 'app-show-subcategory',
  templateUrl: './show-subcategory.component.html',
  styleUrls: ['./show-subcategory.component.css']
})
export class ShowSubcategoryComponent implements OnInit {

  SubcategoryList:any = [];
  pageNo: any = 1;  
  pageNumber: boolean[] = [];  

  modalTitle:any;
  activateAddEditSubCatCom:boolean = false;
  subcategory:any;

  pageField :any= []; 
  exactPageList: any; 
  paginationData: any; ;
  subCategoryPerPage: any = 10; 
  totalProductCategory: any ; 
  totalSubCategoryCount: any;
  total:any;

  constructor(private sharedService: SharedService,
              public  paginationService: PaginationService) { }

  ngOnInit(): void {
    //this.refreshsubcategoryList();
    this.getAllSubCategory();
  }

  isShowDivIf:boolean=false;
  toggleDisplayDiv ()
  {
     this.isShowDivIf = !this.isShowDivIf;  
  }

  refreshsubcategoryList() {
    this.sharedService.getSubproductcategoryList().subscribe(data =>{
      this.SubcategoryList = data;
    });
  }

  getAllSubCategory() {  
   this.sharedService.getSubCategoryPagination(this.pageNo, this.subCategoryPerPage).subscribe((data: any) => { 
     this.SubcategoryList = data;  
      this.getTotalSubCategoryCount();
   })  
  } 

  getTotalSubCategoryCount() {
        this.sharedService.getSubCategoryCount().subscribe((data: any)=> { 
          this.totalSubCategoryCount=data;
          if (this.totalSubCategoryCount != null) {
            this.totalSubCategoryCount.forEach((element:any) => {
              this.total = element.totalcount;
            })
          }
          this.totalNoOfPages();  
        })  
    }

  //Method For Pagination  

totalNoOfPages() { 

  this.paginationData = Number(this.total / this.subCategoryPerPage);  
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
  
  showSubcategoryByPageNumber(page :any, i :any) {  
  this.SubcategoryList = [];  
  this.pageNumber = [];  
  this.pageNumber[i] = true;  
  this.pageNo = page;  
  this.getAllSubCategory();  
  }  
  //

  AddSubProductCategory(){
    this.subcategory={
      Id:0,
      Category_Id:"",
      Sub_Cat_Name:"",
      Sub_Cat_Photo:""
    }
    this.modalTitle = "Add Sub Product Category";
    this.activateAddEditSubCatCom = true;
    this.refreshsubcategoryList();
  }

  
  EditSubProductCategory(item: any){
    this.subcategory = item;
    this.activateAddEditSubCatCom = true;
    this.modalTitle = "Update Sub Product Category";
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteSubProductcategory(item).subscribe(data =>{
        alert(data.toString());
        this.refreshsubcategoryList();
      })
    }
  }

  closeClick(){
    this.activateAddEditSubCatCom=false;
    this.refreshsubcategoryList();
  }
}
