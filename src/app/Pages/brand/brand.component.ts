import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from "src/app/Services/Api/User/user.service";
import { SeoService } from 'src/app/Services/seo.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  IsBrand: any = 0;
  allcategoryList:any = [];
  productcategory:any;

  constructor(private param: ActivatedRoute, private userService: UserService, private router: Router, private seoService: SeoService) { }

  ngOnInit(): void {
    this.refreshallcategoryList();
    this.seoService.setCanonicalURL(window.location.href);
  }

  refreshallcategoryList() {
    this.IsBrand = 1;

    this.userService.getallproductcategoryList(this.IsBrand).subscribe(data =>{
      this.allcategoryList = data;
    });
  }

  onCategoryClick(data: any){
    
    this.router.navigate(['products/',data.Category_Id,data.Category_Name]);
  }
}
