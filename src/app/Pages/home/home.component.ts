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
  categoryName : any;
  blogTitle: any;
//  public id:any;
  constructor(private userService: UserService, private router : Router, private seoService: SeoService,public spinnerService:SpinnerService) { }

  ngOnInit(): void {
    this.refreshproductcategoryList();
    this.refreshblogList();
    this.getCustomerReviews();
    this.seoService.setCanonicalURL(window.location.href);
  }

    // used for CustomerReviews
  customReview: OwlOptions = {
    autoplay:true,
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
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

   // used for blog
  blogOptions: OwlOptions = {
    autoplay:true,
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
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
    this.userService.getbloglist().subscribe(data =>{
      
      if(data != undefined && data!=null){
        this.blogList = data;
        
        if(this.blogList.length>3)
        {
        this.blogOptions.loop=true;
        this.blogOptions.dots=true;
        }
       }
    });
  }

  getCustomerReviews()
  {
    
    this.userService.getCustomerReviews().subscribe(data =>{

      if(data != undefined && data!=null)
      {
         this.customerReview = data;
         if(this.customerReview.length>3)
         {
          this.customReview.loop=true;
          this.customReview.dots=true;
         }
      }
     });
  }

  onCategoryClick(data: any){
    this.categoryName = data.Category_Name.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate(['products/',data.Category_Id,this.categoryName]);
    // this.id=0;
  }

  onBrandClick(item: any){
    this.categoryName = item.Category_Name.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate(['products/',item.Category_Id,this.categoryName]);
    // this.id=1;
  }

  onClick(data: any){
    this.blogTitle = data.Blog_Title.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate(['blog/', data.Blog_Id,this.blogTitle]);
  }

}
