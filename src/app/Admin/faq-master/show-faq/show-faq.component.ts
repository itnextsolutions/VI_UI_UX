import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import { PaginationService } from 'src/app/Services/Api/Admin/pagination.service';

@Component({
  selector: 'app-show-faq',
  templateUrl: './show-faq.component.html',
  styleUrls: ['./show-faq.component.css']
})
export class ShowFaqComponent implements OnInit {

  faqList:any = [];
  pageNo: any = 1;  
  pageNumber: boolean[] = [];  
  menulist: any = [];
  modalTitle:any;
  activateAddEditFaqCom:boolean = false;
  faq:any;


  pageField :any= []; 
  exactPageList: any; 
  paginationData: any; ;
  faqPerPage: any = 10; 
  totalfaq: any ; 
  totalfaqCount: any;
  total:any;

  constructor(private sharedService: SharedService,public paginationService: PaginationService) { }

  ngOnInit(): void {
    this.getAllFaq();
    this.getMenuList();
  }

  getMenuList()
  {
    this.sharedService.getMenuList().subscribe((data: any[]) => { 
      this.menulist = data;
    });
  }

  getAllFaq() {  
    this.sharedService.GetFaqPagination(this.pageNo, this.faqPerPage).subscribe((data: any) => { 
      this.faqList = data;  
      this.getAllFaqCount();
    })  
  } 

  getAllFaqCount() {
    
        this.sharedService.GetFaqCount().subscribe((data: any)=> { 
          this.totalfaqCount=data;
    
          if (this.totalfaqCount != null) {
            this.totalfaqCount.forEach((element:any) => {
              this.total = element.totalcount;
            })
          }
          this.totalNoOfPages();  
        })  
    }
    
    
//Method For Pagination  
totalNoOfPages() { 

  this.paginationData = Number(this.total / this.faqPerPage);  
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
  
  showFaqByPageNumber(page :any, i :any) {  
  this.faqList = [];  
  this.pageNumber = [];  
  this.pageNumber[i] = true;  
  this.pageNo = page;  
  this.getAllFaq();  
  }  


  AddFaq(){
    this.faq={
      Id:0,
      Question:"",
      Answer: "" ,
    }
    this.modalTitle = "Add FAQ";
    this.activateAddEditFaqCom = true;
  }

  EditFaq(item: any){
    this.faq = item;
    this.activateAddEditFaqCom = true;
    this.modalTitle = "Update FAQ";
  }

  
  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteFaq(item).subscribe(data =>{
        alert(data.toString());
        this.getAllFaq();
      })
    }
  }

  closeClick(){
    this.activateAddEditFaqCom=false;
    this.getAllFaq();
  }

}
