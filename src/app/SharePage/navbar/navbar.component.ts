import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "src/app/Services/Api/User/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  productMenuBarList: any = [];
  productcategoryList: any = [];
  categorySubcategory: any = [];
  productcategory: any;
  searchdata: any = [];
  search: any;
  Notification: any = [];
  categoryName: any;
  subCategoryName: any;
  constructor(private userService: UserService, private router :Router) { }

  ngOnInit(): void {
    this.refreshproductcategoryList();
    this.isShowDivIf=false;
  }

  refreshproductcategoryList() {
   this.getproductmenubar();
   this.getNotification();
  }

  getproductmenubar(){
  this.userService.getproductmenubar().subscribe(data => {
    this.productMenuBarList = data;

    if (this.productMenuBarList != null) {
      this.productMenuBarList.forEach((element:any) => {
        let ct = this.categorySubcategory.find((x:any)=>x.Category_Id == element.Category_Id);
        if (!ct) {
            this.categorySubcategory.push({
            Category_Id:    element.Category_Id,
            Category_Name:  element.Category_Name,
              subCat: [{
                Category_Name:  element.Category_Name,
                SubCategory:    element.SubCategory,
                SubCategory_Id: element.SubCategory_Id,
                Product_Id: element.Product_Id,
                IsBrand:element.IsBrand
              }]
          })
        }
        else {
            ct.subCat.push({
              Category_Name:  element.Category_Name,
              SubCategory:    element.SubCategory,
              SubCategory_Id: element.SubCategory_Id,
              Product_Id: element.Product_Id,
              IsBrand:element.IsBrand
          });
        }
      });
    }
    });
  }

  getNotification(){
    this.userService.getNotification().subscribe(data => {
      this.Notification = data;
    });
  }

  onSearch(){
    this.router.navigate(['search-result/', this.search]).then(() => {
      window.location.reload();
  });
}

  onSubCategoryClick(data: any, item: any){
    this.categoryName = item.Category_Name.replace(/\s+/g, '-').toLowerCase();
    this.subCategoryName = item.SubCategory.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate(['/product-details/', this.categoryName, this.subCategoryName, item.Product_Id,item.IsBrand]).then(() => {
      window.location.reload();
    });

  }

  isShowDivIf:boolean=false;
  toggleDisplayDiv ()
  {
     this.isShowDivIf = !this.isShowDivIf;  
  }
}

// this.router.navigate(['product-details/', this.productcategory, this.productsubcategory, product.Product_Id]);