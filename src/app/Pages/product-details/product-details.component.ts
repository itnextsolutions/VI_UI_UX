// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { UserService } from 'src/app/Services/Api/User/user.service';
// import { __values } from 'tslib';

// @Component({
//   selector: 'app-product-details',
//   templateUrl: './product-details.component.html',
//   styleUrls: ['./product-details.component.css']
// })
// export class ProductDetailsComponent implements OnInit {
//   [x: string]: any;
//   route: any;

//   constructor(private param: ActivatedRoute, private userService: UserService) { }

//   categoryfolder: any ;
//   product: any;
//   category_id: any;
//   sizes: any = [];
//   colors: any = [];
//   simillarProducts: any = [];
//   hidden:any;
 
//   ngOnInit(): void {
//     this.productId =this.param.snapshot.paramMap.get('id');
//     this.categoryName =this.param.snapshot.paramMap.get('categoryName');
//     this.categoryName = this.categoryName.replace(/-/g, ' ').toUpperCase();
    
//     this.subcategoryName =this.param.snapshot.paramMap.get('subcategoryName');
//     this.subcategoryName = this.subcategoryName.replace(/-/g, ' ').toUpperCase();

//     this.getProduct();
//     this.getSimillarProduct();
//     this.imageSource();
//   }

//   getSimillarProduct()
//   {
    
//     this.userService.getSimillarProduct(this.productId).subscribe(data =>{
//     this.simillarProducts = data;
//      this.categoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
//     });
//   }

//   getProduct()
//   {
//       this.userService.getProductById(this.productId).subscribe(data =>{
//       this.product = data;

//       if (this.product != null) {
//         this.product.forEach((element:any) => {
//           this.category_id = element.Category_Id;
//         })
//       }
//      });

//      this.userService.getColorListById(this.productId).subscribe(data =>{
//       this.colors =data;
//      });

//      this.userService.getSizeListById(this.productId).subscribe(data =>{
//       this.sizes = data;

      
//      });
//   }

//   onClick(product: any){
//     this.router.navigate(['product-details/', product.Category_Name, product.SubCategory, product.Product_Id]);

//     // this.router.navigate(['blog/', data.Blog_Id]).then(() => {
//     //   window.location.reload();
//     this.ngOnInit();
//   }
 
 
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/Api/User/user.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  [x: string]: any;
  route: any;

  constructor(private param: ActivatedRoute, private userService: UserService) { }

  // isMenDivHidden = false;
  isWoMenDivHidden = true;
  categoryfolder: any;
  product: any;
  category_id: any;
  sizes: any = [];
  colors: any = [];
  simillarProducts: any = [];
  hidden: any;

  menDesc: string = "";
  womenDesc: string = "";

  id:number=0; 

  ngOnInit(): void {
    this.productId = this.param.snapshot.paramMap.get('id');
    this.categoryName = this.param.snapshot.paramMap.get('categoryName');
    this.categoryName = this.categoryName.replace(/-/g, ' ').toUpperCase();

    this.subcategoryName = this.param.snapshot.paramMap.get('subcategoryName');
    this.subcategoryName = this.subcategoryName.replace(/-/g, ' ').toUpperCase();

    this.getProduct();
    this.getSimillarProduct();
    this.imageSource();
  }

  getSimillarProduct() {

    this.userService.getSimillarProduct(this.productId).subscribe(data => {
      this.simillarProducts = data;
      this.categoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
    });
  }

  getProduct() {
    this.userService.getProductById(this.productId).subscribe(data => {
      this.product = data;

      if (this.product != null) {
        this.product.forEach((element: any) => {
          this.category_id = element.Category_Id;
        })
      }
    });

    this.userService.getColorListById(this.productId).subscribe(data => {
      this.colors = data;
    });

    this.userService.getSizeListById(this.productId).subscribe(data => {
      this.sizes = data;


    });
  }

  onClick(product: any) {
    this.router.navigate(['product-details/', product.Category_Name, product.SubCategory, product.Product_Id]);

    // this.router.navigate(['blog/', data.Blog_Id]).then(() => {
    //   window.location.reload();
    this.ngOnInit();
  }


  onClickWomenPhoto() {
  
      this.userService.getProductById(this.productId).subscribe(data => {
        this.product = data;
      });

    this.isMenDivHidden = true;
    this.isWoMenDivHidden = false;
    this.menDesc=this.product.Product_Description;
    this.id=1;
    
  }

  onClickmenPhoto() {
    
    this.userService.getProductById(this.productId).subscribe(data => {
      this.product = data;
    });
    this.isMenDivHidden = false;
    this.isWoMenDivHidden = true;

    this.womenDesc=this.product.WomenProduct_Description;
    this.id=0;
  }
}




