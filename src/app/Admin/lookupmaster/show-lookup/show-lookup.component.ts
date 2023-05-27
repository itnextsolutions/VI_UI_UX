import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import { PaginationService } from 'src/app/Services/Api/Admin/pagination.service';


@Component({
  selector: 'app-show-lookup',
  templateUrl: './show-lookup.component.html',
  styleUrls: ['./show-lookup.component.css']
})

export class ShowLookupComponent implements OnInit {
  
  lookupmasterList:any = [];
  pageNo: any = 1;  
  pageNumber: boolean[] = []; 
  modalTitle:any;
  activateAddEditProlookupCom:boolean = false;
  lookupmaster:any;

  pageField :any= []; 
  exactPageList: any; 
  paginationData: any; ;
  LookupmasterPerPage: any = 10; 
  totalLookupmaster: any ; 
  totalLookupmasterCount: any;
  total:any;

  constructor(private sharedService: SharedService,public paginationService: PaginationService) { }

  ngOnInit(): void {  
    //this.refreshlookupmasterList();
    this.getAllLookup();
  }

  isShowDivIf:boolean=false;
  toggleDisplayDiv ()
  {
     this.isShowDivIf = !this.isShowDivIf;  
  }
  
  refreshlookupmasterList() {
    this.sharedService.getLookupMasterList().subscribe(data =>{
      this.lookupmasterList = data;
    });
  }
  getAllLookup() {  
    this.sharedService.GetLookupMasterPagination(this.pageNo, this.LookupmasterPerPage).subscribe((data: any) => { 
      this.lookupmasterList = data;  
      this.getAllLookupCount();
    })  
  }
  getAllLookupCount() {
    
        this.sharedService.GetLookupMasterCount().subscribe((data: any)=> { 
          this.totalLookupmasterCount=data;
    
          if (this.totalLookupmasterCount != null) {
            this.totalLookupmasterCount.forEach((element:any) => {
              this.total = element.totalcount;
            })
          }
         this.totalNoOfPages();  
        })  
    }
    
//Method For Pagination  
totalNoOfPages() { 
  this.paginationData = Number(this.total / this.LookupmasterPerPage);  
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
  
  this.lookupmasterList = [];  
  this.pageNumber = [];  
  this.pageNumber[i] = true;  
  this.pageNo = page;  
  this.getAllLookup();  
  
  }  

  AddLookupMaster(){
    this.lookupmaster={
      Lookup_Id:0,
      Lookup_Name:""
    }
    this.modalTitle = "Add Lookup";
    this.activateAddEditProlookupCom = true;
    // this.refreshlookupmasterList();
    // this.getAllLookup();
  }
  
  

  EditLookupMaster(item: any){
    this.lookupmaster = item;
    this.activateAddEditProlookupCom = true;
    this.modalTitle = "Update Lookup";
    // this.refreshlookupmasterList();
    // this.getAllLookup();
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteLookupMaster(item).subscribe(data =>{
        alert(data.toString());
        // this.refreshlookupmasterList();
        this.getAllLookup();
      })
    }
  }
  
  closeClick(){
    this.activateAddEditProlookupCom=false;
    this.refreshlookupmasterList();
  }
}
