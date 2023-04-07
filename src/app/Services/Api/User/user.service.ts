import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // readonly APIUrl = "https://testapi.vastraindia.com/api/";
  readonly APIUrl = "https://localhost:44321/api/";
  constructor(private http: HttpClient) {}

    getFAQ(): Observable < any[] > {
      return this.http.get < any > (this.APIUrl + 'Home/GetFaq');
    }

    getNotification(): Observable < any[] > {
      return this.http.get < any > (this.APIUrl + 'Home/GeNotification');
    }

    getsearchResult(search: any): Observable < any[] > {
      return this.http.get < any > (this.APIUrl + 'Home/GetSearchProduct?search=' + search);
    }

    getCustomerReviews(): Observable < any[] > {
      return this.http.get < any > (this.APIUrl + 'Home/GetCustomerReview');
    }

    getproductcategoryList(): Observable < any[] > {
        return this.http.get < any > (this.APIUrl + 'Home/GetCategory');
    }

    getallproductcategoryList(): Observable < any[] > {
      return this.http.get < any > (this.APIUrl + 'Home/GetAllCategory');
    }

    getproductmenubar(): Observable < any[] > {
      return this.http.get < any > (this.APIUrl + 'Home/GetProductMenu');
    }
    
    getbloglist(number: any): Observable < any[] > {
      return this.http.get < any > (this.APIUrl + 'Home/GetBlog?number=' + number);
    }
    
    getallbloglist(blog_Id: any): Observable < any[] > {
      return this.http.get < any > (this.APIUrl + 'Home/GetAllBlogs?blog_Id=' + blog_Id);
    }

    getblogbyid(blog_Id: any): Observable < any[] > {
      return this.http.get < any > (this.APIUrl + 'Home/GetBlogById?blog_Id=' + blog_Id);
    }

    getSubcategoryByCategoryId(category_id :any): Observable < any[] > {
      return this.http.get < any > (this.APIUrl + 'Home/GetSubCategoryByCategoryId?id=' + category_id);
    }

    getSubCategoryById(subcategory_id :any[]): Observable < any[] > {
      return this.http.get < any > (this.APIUrl + 'Home/GetSubCategoryById?id=' + subcategory_id);
    }

    getProductBySubCategoryId(category_id :any, subCatId:any): Observable < any[] >{
      return this.http.get < any > (this.APIUrl + 'Home/GetProductsBySubCategory?id=' + category_id + "&SubCatId="+subCatId);
    }

    getProductByCategoryId(category_id :any): Observable < any[] > {
      return this.http.get < any > (this.APIUrl + 'Home/GetProductsByCategory?categoryId=' + category_id);
    }

    getProductById(product_id :any):Observable< any[]> {
      return this.http.get < any > (this.APIUrl + 'Product/GetProductsByid?id=' + product_id);
    }

    getSimillarProduct(product_id :any):Observable< any[]> {
      return this.http.get < any > (this.APIUrl + 'Home/GetSimillarProducts?id=' + product_id);
    }
    getColorListById(product_id : any):Observable<any>{
      return this.http.get < any > (this.APIUrl + 'Home/GetColorCodeListByProductId?id=' + product_id);
    }

    getSizeListById(product_id : any):Observable<any>{
      return this.http.get < any > (this.APIUrl + 'Home/GetSizeListByProductId?id=' + product_id);
    }

    submitContactForm(val: any) {
      return this.http.post(this.APIUrl + 'Contact/ContactUs', val);
     }
  }