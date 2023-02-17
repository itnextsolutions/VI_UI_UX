
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from 'src/app/Services/Api/User/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productData : any; 
  getCategoryId: any=[];
  productList :any=[];
  category:any
  productSubCategoryList:any=[];
  getSubCategoryId:any=[];
  getCategoryName :any;

  constructor(private param :ActivatedRoute,
              private userService: UserService,
              private router :Router) { }

  ngOnInit(): void {
    this.getProductByCategory();
    this.getProductSubcategoryList();
    
  }

  getProductSubcategoryList(){
    this.getCategoryId = this.param.snapshot.paramMap.get('category_id');
    this.userService.getSubcategoryByCategoryId(this.getCategoryId).subscribe(data =>{
        this.productSubCategoryList = data;
    });
  }

  getProductByCategory(){
    debugger
    this.getCategoryId = this.param.snapshot.paramMap.get('category_id');
    this.getCategoryName = this.param.snapshot.paramMap.get('categoryName');
    console.log(this.getCategoryId );
    this.userService.getProductByCategoryId(this.getCategoryId).subscribe(data =>{
      this.productList = data;
    });
  }

  getProduct(categoryId:any, subCatId: any){
    debugger;
    this.userService.getProductBySubCategoryId(categoryId,subCatId).subscribe(data =>{
      this.productList = data;
    });
  }

  onClick(product: any){
    this.router.navigate(['product-details/', product.Product_Id]);

  }
  
}
