import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";

import { PaginationService } from 'src/app/Services/Api/Admin/pagination.service';

@Component({
  selector: 'app-show-notification',
  templateUrl: './show-notification.component.html',
  styleUrls: ['./show-notification.component.css']
})
export class ShowNotificationComponent implements OnInit {
  notificationList:any = [];
  pageNo: any = 1;  
  pageNumber: boolean[] = [];  
  modalTitle:any;
  activateAddEditnotificationCom:boolean = false;
  notification:any;

  pageField :any= []; 
  exactPageList: any; 
  paginationData: any; ;
  notificationPerPage: any = 10; 
  totalnotification: any ; 
  totalnotificationCount: any;
  total:any;

  constructor(private sharedService: SharedService,public paginationService: PaginationService) { }


  ngOnInit(): void {
   // this.refreshnotificationList();
    this.getAllNotification();
  }

  refreshnotificationList() {
    this.sharedService.getNotificationList().subscribe(data =>{
      this.notificationList = data;
    });
  }

  getAllNotification() {  
    this.sharedService.GetNotificationPagination(this.pageNo, this.notificationPerPage).subscribe((data: any) => { 
      this.notificationList = data;  
      this.getAllNotificationCount();
    })  
  } 

  getAllNotificationCount() {
    
        this.sharedService.GetNotificationCount().subscribe((data: any)=> { 
          this.totalnotificationCount=data;
    
          if (this.totalnotificationCount != null) {
            this.totalnotificationCount.forEach((element:any) => {
              this.total = element.totalcount;
            })
          }
          this.totalNoOfPages();  
        })  
    }

//Method For Pagination  
totalNoOfPages() { 

  this.paginationData = Number(this.total / this.notificationPerPage);  
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
  
  showNotificationByPageNumber(page :any, i :any) {  
  this.notificationList = [];  
  this.pageNumber = [];  
  this.pageNumber[i] = true;  
  this.pageNo = page;  
  this.getAllNotification();  
  
  }  

  Addnotification(){
    this.notification={
      NotificationId:0,
      NotificationTitle:"",
      FromDate: "" ,
      ToDate: "",
      ButtonText:"",
      ButtonUrl:"",
    }
    this.modalTitle = "Add notification";
    this.activateAddEditnotificationCom = true;
    this.refreshnotificationList();
  }

  Editnotification(item: any){
    
    this.notification = item;
    this.activateAddEditnotificationCom = true;
    this.modalTitle = "Update notification";
    this.refreshnotificationList();
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteNotification(item).subscribe(data =>{
        alert(data.toString());
        this.refreshnotificationList();
      })
    }
  }

  closeClick(){
    this.activateAddEditnotificationCom=false;
    this.refreshnotificationList();
  }

}
