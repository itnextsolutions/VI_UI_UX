import { Component, Input, OnInit } from '@angular/core';
import { DataService } from "src/app/Services/Api/Data/data.service";
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from "src/app/Services/Api/User/user.service";

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css'],
  providers: [DataService]
})
export class SearchresultComponent implements OnInit {

  // @Input()
  SearchText: any;
  subcategory_id: any;
  productsubcategory: any;
  productcategory: any;
  SearchResult : any = [];
  subcategorydetails : any = [];

  constructor(private userService: UserService, private router :Router, private param :ActivatedRoute,) { }

  ngOnInit(): void {
    this.SearchText = this.param.snapshot.paramMap.get('search');
    this.getsearchResult(this.SearchText);
    
  }
  
  getsearchResult(SearchText: any){
    this.userService.getsearchResult(this.SearchText).subscribe(data => {
      this.SearchResult = data;

    //   if (this.SearchResult != null) {
    //     this.SearchResult.forEach((element:any) => {
    //       this.productsubcategory = element.SubCategory;
    //       this.productcategory = element.Category_Name;
    //     })
    //   }

     });
  }

 
  onClick(product: any){
    
    this.productcategory = product.Category_Name.replace(/\s+/g, '-').toLowerCase();
    this.productsubcategory =  product.SubCategory.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate(['product-details/', this.productcategory, this.productsubcategory, product.Product_Id]);
  }
}