import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html', 
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  constructor(private jwthelper:JwtHelperService) { }

  ngOnInit(): void {
  }

  isUserAuthenticated()
  {
    const token=localStorage.getItem("jwt");
    if(token && !this.jwthelper.isTokenExpired(token))   
    {
      return true;
    } 
    else{
      return false;
    }
  }

}
