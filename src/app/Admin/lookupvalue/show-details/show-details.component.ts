import { Component, OnInit } from '@angular/core';
import { GetColorName } from 'hex-color-to-color-name';
import { SharedService } from "src/app/Services/shared.service";
import { PaginationService } from 'src/app/Services/Api/Admin/pagination.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  lookupdetailsList:any = [];
  pageNo: any = 1;  
  pageNumber: boolean[] = [];  
  modalTitle:any;
  activateAddEditProlookupdetailsCom:boolean = false;
  lookupdetail:any;
  color:any;

    
  pageField :any= []; 
  exactPageList: any; 
  paginationData: any; ;
  LookupDetailsPerPage: any = 10; 
  totalLookupDetails: any ; 
  totalLookupDetailsCount: any;
  lookupvaluesPerPage: any = 10; 
  total:any;

  constructor(private sharedService: SharedService,public paginationService: PaginationService) { }

  ngOnInit(): void {
    this.getAllLookupDetails();
   // this.refreshlookupdetailsList();
    const colorName = GetColorName('000000'); 
  }

  isShowDivIf:boolean=false;
  toggleDisplayDiv ()
  {
     this.isShowDivIf = !this.isShowDivIf;  
  }
  
  refreshlookupdetailsList() {
    this.sharedService.getLookupDetailsList().subscribe(data =>{
      this.lookupdetailsList = data;
      this.color = GetColorName('000000');
    });
  }

  getAllLookupDetails() {  
   this.sharedService.GetLookupDetailsPagination(this.pageNo, this.LookupDetailsPerPage).subscribe((data: any) => { 
     this.lookupdetailsList = data;  
     this.color = GetColorName('000000');
     this.getAlltotalLookupDetailsCount();
   })  
  } 
  getAlltotalLookupDetailsCount() {
    
        this.sharedService.GetLookupDetailsCount().subscribe((data: any)=> { 
          this.totalLookupDetailsCount=data;
          if (this.totalLookupDetailsCount != null) {
            this.totalLookupDetailsCount.forEach((element:any) => {
              this.total = element.totalcount;
            })
          }
          this.totalNoOfPages();  
        })  
    }
       
//Method For Pagination  
totalNoOfPages() { 
  this.paginationData = Number(this.total / this.LookupDetailsPerPage);  
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
  
  showLookupByPageNumber(page :any, i :any) {  
  this.lookupdetailsList = [];  
  this.pageNumber = [];  
  this.pageNumber[i] = true;  
  this.pageNo = page;  
  this.getAllLookupDetails();  
  }
  
  AddLookupDetails(){
    this.lookupdetail={
      Lookup_Details_Id:0,
      Description:"",
      Lookup_Name:"",
      Lookup_Id:0,
    }
    this.modalTitle = "Add Lookup Value";
    this.activateAddEditProlookupdetailsCom = true;
  }

  EditLookupDetails(item: any){
    this.lookupdetail = item;
    this.activateAddEditProlookupdetailsCom = true;
    this.modalTitle = "Update Lookup Value";
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteLookupDetails(item).subscribe(data =>{
        alert(data.toString());
        this.getAllLookupDetails();
      })
    }
  }

  closeClick(){
    this.activateAddEditProlookupdetailsCom=false;
    this.getAllLookupDetails();
  }

}