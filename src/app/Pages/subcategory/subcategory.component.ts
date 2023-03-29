import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { UserService } from "src/app/Services/Api/User/user.service";

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  category_id: any;
  subcategory_id: any;
  subcategorydetails: any = [];
  productcategory: any = [];
  productsubcategory: any;
  productList: any = [];

  constructor(private userService: UserService, private param: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    this.category_id = this.param.snapshot.paramMap.get('category_id');
    this.subcategory_id = this.param.snapshot.paramMap.get('subcategory_id');
    this.getProduct(this.category_id, this.subcategory_id);
    this.getSubCategory(this.subcategory_id);
  }
  

  getProduct(category_id:any, subcategory_id: any){
    
    this.userService.getProductBySubCategoryId(category_id,subcategory_id).subscribe(data =>{
      this.productList = data;
    });
  }

  getSubCategory(subcategory_id: any) {
      this.userService.getSubCategoryById(subcategory_id).subscribe(data =>{
        this.subcategorydetails = data;

        if (this.subcategorydetails != null) {
          this.subcategorydetails.forEach((element:any) => {
            this.productsubcategory = element.SubCategory;
            this.productcategory = element.Category_Name;
          })
        }

      });
    }

    onClick(product: any){
      this.productcategory = this.productcategory.replace(/\s+/g, '-').toLowerCase();
      this.productsubcategory =  this.productsubcategory.replace(/\s+/g, '-').toLowerCase();
      this.router.navigate(['product-details/', this.productcategory, this.productsubcategory, product.Product_Id]);
    }
  
}
