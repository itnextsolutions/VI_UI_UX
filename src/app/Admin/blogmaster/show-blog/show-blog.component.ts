import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import { PaginationService } from 'src/app/Services/Api/Admin/pagination.service';

@Component({
  selector: 'app-show-blog',
  templateUrl: './show-blog.component.html',
  styleUrls: ['./show-blog.component.css']
})
export class ShowBlogComponent implements OnInit {

  blogList : any ="";
  pageNo: any = 1;  
  pageNumber: boolean[] = [];  
  modalTitle:any;
  activateAddEditBlog:boolean = false;
  blog:any;
  no : any= 1;

   
  pageField :any= []; 
  exactPageList: any; 
  paginationData: any; ;
  blogPerPage: any = 10; 
  totalblog: any ; 
  totalblogCount: any;
  total:any;

  constructor(private sharedService: SharedService,public paginationService: PaginationService) { }

  ngOnInit(): void {
    //this.refreshBlogList();
    this.getAllBlog();
  }

  refreshBlogList() {
    this.sharedService.getAllblog().subscribe(data =>{
      this.blogList = data;
    });
  }

  getAllBlog() {  
    this.sharedService.getBlogPagination(this.pageNo, this.blogPerPage).subscribe((data: any) => { 
      this.blogList = data;  
      this.getAllBlogCount();
    })  
  } 
  getAllBlogCount() {
    
        this.sharedService.getBlogCount().subscribe((data: any)=> { 
          this.totalblogCount=data;
    
          if (this.totalblogCount != null) {
            this.totalblogCount.forEach((element:any) => {
              this.total = element.totalcount;
            })
          }
         this.totalNoOfPages();  
        })  
    }

    
//Method For Pagination  

totalNoOfPages() { 

  this.paginationData = Number(this.total / this.blogPerPage);  
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
  
  showBlogPageNumber(page :any, i :any) {  
  
  this.blogList = [];  
  this.pageNumber = [];  
  this.pageNumber[i] = true;  
  this.pageNo = page;  
  this.getAllBlog();  
  
  }  
  
  AddBlog(){
    this.blog={
      Blog_Id:0,
      Blog_Title:"",
      Blog_Topic:"",
      Blog_Content:"",
    
      Image_Name:"",
    }
    this.modalTitle = "Add Blog";
    this.activateAddEditBlog = true;
    this.refreshBlogList();
  }
  
  EditBlog(item: any){
    this.blog = item;
    this.activateAddEditBlog = true;
    this.modalTitle = "Update Blog";
    this.refreshBlogList();
  }
  
  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteBlog(item).subscribe(data =>{
        alert(data.toString());
        this.refreshBlogList();
      })
    }
  }

  closeClick(){
    this.activateAddEditBlog=false;
    this.refreshBlogList();
  }
}
