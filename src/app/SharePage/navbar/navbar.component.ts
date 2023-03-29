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

  constructor(private userService: UserService, private router :Router) { }

  ngOnInit(): void {
    this.refreshproductcategoryList();
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
                Product_Id: element.Product_Id
              }]
          })
        }
        else {
            ct.subCat.push({
              Category_Name:  element.Category_Name,
              SubCategory:    element.SubCategory,
              SubCategory_Id: element.SubCategory_Id,
              Product_Id: element.Product_Id
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
    this.router.navigate(['search-result/', this.search]);
  }

  onSubCategoryClick(data: any, item: any){
    this.router.navigate(['/product-details/', item.Category_Name, item.SubCategory, item.Product_Id]).then(() => {
      window.location.reload();
    });

  }
  

}

// this.router.navigate(['product-details/', this.productcategory, this.productsubcategory, product.Product_Id]);