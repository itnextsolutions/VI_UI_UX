import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from "src/app/Services/Api/User/user.service";
import { SeoService } from 'src/app/Services/seo.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  IsBrand: any = 0;
  allcategoryList:any = [];
  productcategory:any;
  categoryName: any;

  constructor(private param: ActivatedRoute, private userService: UserService, private router: Router, private seoService: SeoService) { }

  ngOnInit(): void {
    this.refreshallcategoryList();
    this.seoService.setCanonicalURL(window.location.href);
  }

  refreshallcategoryList() {
    this.IsBrand = 0;

    this.userService.getallproductcategoryList(this.IsBrand).subscribe(data =>{
      this.allcategoryList = data;
    });
  }

  onCategoryClick(data: any){
    this.categoryName = data.Category_Name.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate(['products/',data.Category_Id,this.categoryName]);
  }

  }


