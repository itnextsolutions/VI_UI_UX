import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "src/app/Services/Api/User/user.service";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SeoService } from 'src/app/Services/seo.service';
import { SpinnerService } from 'src/app/spinner-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productcategoryList:any = [];
  categoryList:any = [];
  brandList:any = [];
  blogList:any = [];
  customerReview:any = [];
  modalTitle:any;
  productcategory:any;
  blogno:any=0;  
//  public id:any;
  constructor(private userService: UserService, private router : Router, private seoService: SeoService,public spinnerService:SpinnerService) { }

  ngOnInit(): void {
    this.refreshproductcategoryList();
    this.refreshblogList();
    this.getCustomerReviews();
    this.seoService.setCanonicalURL(window.location.href);
  }

  customOptions: OwlOptions = {
    autoplay:true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    margin:5,
    autoWidth:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1.2
      },
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 3
      }
    }
    
  }

  refreshproductcategoryList() {
    this.userService.getproductcategoryList().subscribe(data =>{
      this.productcategoryList = data;
// console.log(this.productcategoryList)
      if (this.productcategoryList != null) {
        this.productcategoryList.forEach((element:any) => {
          if (element.IsBrand ==0) {
              this.categoryList.push({
              Category_Id:    element.Category_Id,
              Category_Name:  element.Category_Name,
              Category_Photo:  element.Category_Photo,
              IsBrand:element.IsBrand
            })
          }
          else {
             this.brandList.push({
              Category_Id:    element.Category_Id,
              Category_Name:  element.Category_Name,
              Category_Photo:  element.Category_Photo,
              IsBrand:element.IsBrand
            });
          }
        });
      }

    });
  }

 


  refreshblogList() 
  {
    this.blogno = 3;
    this.userService.getbloglist(this.blogno).subscribe(data =>{
      this.blogList = data;
    });
  }

  getCustomerReviews()
  {
    
    this.userService.getCustomerReviews().subscribe(data =>{

      if(data != undefined && data!=null){
         this.customerReview = data;
        }
     });
  }

  onCategoryClick(data: any){
    this.router.navigate(['products/',data.Category_Id,data.Category_Name]);
    // this.id=0;
  }

  onBrandClick(item: any){
    this.router.navigate(['products/',item.Category_Id,item.Category_Name]);
    // this.id=1;
  }

  onClick(data: any){
    this.router.navigate(['blog/', data.Blog_Id]);
  }

}
