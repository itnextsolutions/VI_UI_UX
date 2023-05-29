
import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from 'src/app/Services/Api/User/user.service';
import { SeoService } from 'src/app/Services/seo.service';

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
  categoryFolderName:any;
  productSubCategoryList:any=[];
  getSubCategoryId:any=[];
  CategoryName :any;
  // @Input() id:any; 

  constructor(private param :ActivatedRoute,
              private userService: UserService,
              private router :Router,
              private seoService: SeoService) { }

  ngOnInit(): void {
    this.getProductByCategory();
    this.getProductSubcategoryList();
    this.seoService.setCanonicalURL(window.location.href);
  }

  getProductSubcategoryList(){
    this.getCategoryId = this.param.snapshot.paramMap.get('category_id');
    this.userService.getSubcategoryByCategoryId(this.getCategoryId).subscribe(data =>{
        this.productSubCategoryList = data;
    });
  }

  getProductByCategory(){
    this.getCategoryId = this.param.snapshot.paramMap.get('category_id');
    this.CategoryName = this.param.snapshot.paramMap.get('categoryName');
    this.categoryFolderName = this.CategoryName.replace(/\s+/g, '-').toLowerCase();
   
    this.userService.getProductByCategoryId(this.getCategoryId).subscribe(data =>{
      this.productList = data;
    });
  }

  getProduct(categoryId:any, subCatId: any){
    
    this.userService.getProductBySubCategoryId(categoryId,subCatId).subscribe(data =>{
      this.productList = data;
    });
  }

  onClick(product: any){
    this.router.navigate(['product-details/', product.Category_Name, product.SubCategory, product.Product_Id]);
  }
  
}
