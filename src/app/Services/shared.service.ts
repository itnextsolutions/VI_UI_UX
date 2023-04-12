import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticatedResponse } from '../app.module';
//import { AuthenticatedResponse } from '../app.module';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
// readonly APIUrl = "https://testapi.vastraindia.com/api/";
readonly APIUrl = "https://localhost:44321/api/";
  constructor(private http: HttpClient) {}

//Menu Binding
getMenuList(): Observable < any[] > {
  return this.http.get< any > (this.APIUrl + 'Home/GetMenuList');
}

// Login(val: any) {
// return this.http.post(this.APIUrl + 'Login/login', val);
// }

// Login(val: any) {
//   debugger
//    return this.http.post(this.APIUrl + 'Login/login', val);
// }

Login(val: any) {
  debugger
   return this.http.post(this.APIUrl + 'Login/login', val);
}
//Product Category  Start
getproductcategoryList(): Observable < any[] > {
    return this.http.get < any > (this.APIUrl + 'Product/GetCategory');
}

getSubcategoryByCategoryId(): Observable < any[] > {
  return this.http.get < any > (this.APIUrl + 'Product/GetSubCategoryByCategoryId');
}
addProductcategory(val: any) {debugger
    return this.http.post(this.APIUrl + 'Product/InsertCategory', val);
}
updateProductcategory(val: any) {
    return this.http.put(this.APIUrl + 'Product/UpdateCategory', val);
}
deleteProductcategory(category_id: any) {
    return this.http.delete(this.APIUrl + 'Product/DeleteCategory?id=' + category_id);
}
//Product Category  End

// Look Up Master API's start
getLookupMasterList(): Observable < any[] > {
  return this.http.get < any > (this.APIUrl + 'Lookup/GetLookupMaster');
}
addLookupMaster(val: any) {
  return this.http.post(this.APIUrl + 'Lookup/InsertLookupMaster', val);
}
updateLookupMaster(val: any) {
  return this.http.put(this.APIUrl + 'Lookup/UpdateLookupMaster', val);
}
deleteLookupMaster(Lookup_Id: any) {
  return this.http.delete(this.APIUrl + 'Lookup/DeleteLookupMaster?id=' + Lookup_Id);
}
// Look Up Master API's End

// Look Up Values API's start
getLookupDetailsList(): Observable < any[] > {
    return this.http.get < any > (this.APIUrl + 'Lookup/GetLookupDetails');
}

addLookupDetails(val: any) {
  return this.http.post(this.APIUrl + 'Lookup/InsertLookupDetails', val);
}

updateLookupDetails(val: any) {
  return this.http.put(this.APIUrl + 'Lookup/UpdateLookupDetails', val);
}

deleteLookupDetails(Lookup_Details_Id: any) {
  return this.http.delete(this.APIUrl + 'Lookup/DeleteLookupDetails?id=' + Lookup_Details_Id);
}

GetLookupNameDropDown(): Observable < any[] > {
  return this.http.get < any > (this.APIUrl + 'Lookup/GetLookupNameDropDown');
}
  // Look Up Values API's End

// Product API's Start
getProductDetailsList(): Observable < any[] > {
  return this.http.get < any > (this.APIUrl + 'Product/GetProducts');
}

addProductDetails(val: any) {
return this.http.post(this.APIUrl + 'Product/InsertProduct', val);
}

updateProductDetails(val: any) {debugger
return this.http.put(this.APIUrl + 'Product/UpdateProduct', val);
}

deleteProductDetails(Product_Id: any) {
return this.http.delete(this.APIUrl + 'Product/DeleteProduct?id=' + Product_Id);
}

GetProductCatDropDown(): Observable < any[] > {
return this.http.get < any > (this.APIUrl + 'Product/GetProdutCatDropDown');
}

GetSize(): Observable < any[] > {
return this.http.get < any > (this.APIUrl + 'Lookup/GetSize');
}

GetColor(): Observable < any[] > {
return this.http.get < any > (this.APIUrl + 'Lookup/GetColor');
}

// Login API's End



//Blog Start
getblog(): Observable < any[] > {
return this.http.get < any > (this.APIUrl + 'Blog/GetBlog');
}
getAllblog(): Observable < any[] > {
return this.http.get < any > (this.APIUrl + 'Blog/GetAllBlog');
}
addblog(val: any) {
return this.http.post(this.APIUrl + 'Blog/InsertBlog', val);
}

updateBlog(val: any) {
return this.http.put(this.APIUrl + 'Blog/UpdateBlog', val);
}

deleteBlog(Blog_Id: any) {
return this.http.delete(this.APIUrl + 'Blog/Delete?id=' + Blog_Id);
}
//Blog End

//Customer Review Start
getCustomerReview(): Observable < any[] > {
return this.http.get < any > (this.APIUrl + 'Customer/GetCustomerReview');
}
addCustomerReview(val: any) {
return this.http.post(this.APIUrl + 'Customer/InsertCustomerReview', val);
}
updateCustomerReview(val: any) {
return this.http.put(this.APIUrl + 'Customer/UpdateCustomerReview', val);
}

deleteCustReview(Customer_Review_Id: any) {
return this.http.delete(this.APIUrl + 'Customer/DeleteCustomerReview?id=' + Customer_Review_Id);
}
//Customer Review End

//Sub product category Start

getSubproductcategoryList(): Observable < any[] > {
return this.http.get < any > (this.APIUrl + 'Product/GetSubCategory');
}

addSubProductcategory(val: any) {
return this.http.post(this.APIUrl + 'Product/InsertSubCategory', val);
}

updateSubProductcategory(val: any) {
return this.http.put(this.APIUrl + 'Product/UpdateSubCategory', val);
}


deleteSubProductcategory(Id: any) {
return this.http.delete(this.APIUrl + 'Product/DeleteSubCategory?id=' + Id);
}

GetProductCatDropDownList(): Observable < any[] > {
return this.http.get < any > (this.APIUrl + 'Product/GetProdutCatDropDown');
}

//Sub product category Ent
GetSubCatByCatid(id: any) {
return this.http.get(this.APIUrl + 'Product/GetSubCatByCatid?id=' + id);
}

GetColorCodeListByProductId(id: any) {
return this.http.get(this.APIUrl + 'Product/GetColorCodeListByProductId?id=' + id);
}

//Notfication  Start
getNotificationList(): Observable < any[] > {
return this.http.get < any > (this.APIUrl + 'Notification/GetNotification');
}
addNotification(val: any) {
return this.http.post(this.APIUrl + 'Notification/InsertNotification', val);
}
updateNotification(val: any) {
return this.http.put(this.APIUrl + 'Notification/UpdateNotification', val);
}
deleteNotification(NotificationId: any) {
return this.http.delete(this.APIUrl + 'Notification/DeleteNotification?id=' + NotificationId);
}
//Notfication  End

//pagination satart CustReview
getCustReviewPagination(pageNo:any,pageSize:any): Observable<any> {  
return this.http.get(this.APIUrl + 'Customer/GetCustomerReviewPagination?pageNo='
 + pageNo+'&pageSize='+pageSize); 
}

getCustReviewCount(): Observable <any> {
  return this.http.get < any > (this.APIUrl + 'Customer/GetCustomerReviewCount');
}
//End pagination CustReview

//pagination satart Product Category Pagination
getProductPagination(pageNo:any,pageSize:any): Observable<any> {  
return this.http.get(this.APIUrl + 'Product/GetProductPagination?pageNo='
 + pageNo+'&pageSize='+pageSize); 
}

getProductCount(): Observable <any> {
  return this.http.get <any> (this.APIUrl + 'Product/GetProductCount');
}
//End  Product Category Pagination  


//pagination satart Product Category Pagination
getProductCategoryPagination(pageNo:any,pageSize:any): Observable<any> {  
return this.http.get(this.APIUrl + 'Product/GetProductCategoryPagination?pageNo='
 + pageNo+'&pageSize='+pageSize); 
}

getProductCategoryCount(): Observable <any> {
  return this.http.get <any> (this.APIUrl + 'Product/GetProductCategoryCount');
}
//End  Product Category Pagination

//pagination satart Sub Category Pagination
getSubCategoryPagination(pageNo:any,pageSize:any): Observable<any> {  
  return this.http.get(this.APIUrl + 'Product/SubCategoryPagination?pageNo='
  + pageNo+'&pageSize='+pageSize); 
  }

getSubCategoryCount(): Observable <any> {
  return this.http.get <any> (this.APIUrl + 'Product/SubCategoryCount');
  }
//End  Sub Category Pagination


//pagination satart Blog 
getBlogPagination(pageNo:any,pageSize:any): Observable<any> {  
return this.http.get(this.APIUrl + 'Blog/GetAllBlogPagination?pageNo='
 + pageNo+'&pageSize='+pageSize); 
}

getBlogCount(): Observable <any> {
  return this.http.get <any> (this.APIUrl + 'Blog/GetAllBlogCount');
}
//End Blog Pagination

 //pagination satart Notification 
 GetNotificationPagination(pageNo:any,pageSize:any): Observable<any> {  
return this.http.get(this.APIUrl + 'Notification/GetNotificationPagination?pageNo='
 + pageNo+'&pageSize='+pageSize); 
}

GetNotificationCount(): Observable <any> {
  return this.http.get <any> (this.APIUrl + 'Notification/GetNotificationCount');
}
//End Notification Pagination

 //pagination satart LookupMaster 
 GetLookupMasterPagination(pageNo:any,pageSize:any): Observable<any> {  
  return this.http.get(this.APIUrl + 'Lookup/GetLookupMasterPagination?pageNo='
   + pageNo+'&pageSize='+pageSize); 
  }

  GetLookupMasterCount(): Observable <any> {
    return this.http.get <any> (this.APIUrl + 'Lookup/GetLookupMasterCount');
  }
  //End LookupMaster Pagination

 //pagination satart Lookup Details 
 GetLookupDetailsPagination(pageNo:any,pageSize:any): Observable<any> {  
  return this.http.get(this.APIUrl + 'Lookup/GetLookupDetailsPagination?pageNo='
   + pageNo+'&pageSize='+pageSize); 
  }

  GetLookupDetailsCount(): Observable <any> {
    return this.http.get <any> (this.APIUrl + 'Lookup/GetLookupDetailsCount');
  }
  //End Lookup Details Pagination

  //Start Faq 
    GetFaqPagination(pageNo:any,pageSize:any): Observable<any> {  
  return this.http.get(this.APIUrl + 'Faq/GetAllFaqPagination?pageNo='
    + pageNo+'&pageSize='+pageSize); 
  }

  GetFaqCount(): Observable <any> {
   return this.http.get <any> (this.APIUrl + 'Faq/GetFaqCount');
  }
  
   addFaq(val: any) {
    return this.http.post(this.APIUrl + 'Faq/InsertFaq', val);
  }

   updateFaq(val: any) {
    return this.http.put(this.APIUrl + 'Faq/UpdateFaq', val);
  }

   deleteFaq(Id: any) {
    return this.http.delete(this.APIUrl + 'Faq/Delete?id=' + Id);
  }
  }