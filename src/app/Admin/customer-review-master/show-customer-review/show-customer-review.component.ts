import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import { PaginationService } from 'src/app/Services/Api/Admin/pagination.service';

@Component({
  selector: 'app-show-customer-review',
  templateUrl: './show-customer-review.component.html',
  styleUrls: ['./show-customer-review.component.css']
})

export class ShowCustomerReviewComponent implements OnInit {

  CustomerReviewList:any = [];
  pageNo: any = 1;  
  pageNumber: boolean[] = [];  
  modalTitle:any;
  activateAddEditCustReviewCom:boolean = false;
  cust_review:any;

  
  pageField :any= []; 
  exactPageList: any; 
  paginationData: any; ;
  custreviewPerPage: any = 10; 
  totalcustreview: any ; 
  totalcustreviewCount: any;
  total:any;

  constructor(private sharedService: SharedService ,public paginationService: PaginationService) { }

  ngOnInit(): void {
    //this.refreshCust_ReviewList();
    this.getAllReview();
  }

  refreshCust_ReviewList() {
    this.sharedService.getCustomerReview().subscribe(data =>{
      this.CustomerReviewList = data;
    });
  }

  getAllReview() {  
    this.sharedService.getCustReviewPagination(this.pageNo, this.custreviewPerPage).subscribe((data: any) => { 
      this.CustomerReviewList = data;  
      this.getAllCustReviewCount();
    })  
  } 
  
//Method For Pagination  
totalNoOfPages() { 

this.paginationData = Number(this.total / this.custreviewPerPage);  
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

showgetCustReviewByPageNumber(page :any, i :any) {  

this.CustomerReviewList = [];  
this.pageNumber = [];  
this.pageNumber[i] = true;  
this.pageNo = page;  
this.getAllReview();  

}  

getAllCustReviewCount() {

    this.sharedService.getCustReviewCount().subscribe((data: any)=> { 
      this.totalcustreviewCount=data;

      if (this.totalcustreviewCount != null) {
        this.totalcustreviewCount.forEach((element:any) => {
          this.total = element.totalcount;
        })
      }
      this.totalNoOfPages();  
    })  
}

  AddCust_Review(){
    this.cust_review={
      Customer_Review_Id:0,
      Client_Name:"",
      Profession:"",
      Review:"",
      Client_Photo:"",
      Rating:""
    }
    this.modalTitle = "Add Client Review";
    this.activateAddEditCustReviewCom = true;
  }

  EditCust_Review(item: any){
    this.cust_review = item;
    this.activateAddEditCustReviewCom = true;
    this.modalTitle = "Update Client Review";
  }

  closeClick(){
    this.activateAddEditCustReviewCom=false;
    this.getAllReview();
  }


  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteCustReview(item).subscribe(data =>{
        alert(data.toString());
        this.getAllReview();
      })
    }
  }
}
