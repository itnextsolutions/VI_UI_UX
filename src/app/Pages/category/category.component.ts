import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "src/app/Services/Api/User/user.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  allcategoryList:any = [];
  productcategory:any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.refreshallcategoryList();
  }

  refreshallcategoryList() {
    this.userService.getallproductcategoryList().subscribe(data =>{
      this.allcategoryList = data;
    });
  }

  onCategoryClick(data: any){
    
    this.router.navigate(['products/',data.Category_Id,data.Category_Name]);
  }

  }


