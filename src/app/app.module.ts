import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { UniquePipe } from './Pipe/uniqueFilter.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { ProductsComponent } from './Pages/products/products.component';
import { CategoryComponent } from './Pages/category/category.component';
import { BlogComponent } from './Pages/blog/blog.component';
import { BlogContentComponent } from './Pages/blog/blog-content/blog-content.component';
import { TestimonialComponent } from './Pages/testimonial/testimonial.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { SearchresultComponent } from './Pages/searchresult/searchresult.component';
import { FaqComponent } from './Pages/faq/faq.component';
import { SubcategoryComponent } from './Pages/subcategory/subcategory.component';

import { NavbarComponent } from './SharePage/navbar/navbar.component';
import { FooterComponent } from './SharePage/footer/footer.component';

import { LoginComponent } from './Admin/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from "./Services/shared.service";
import { DataService } from "./Services/Api/Data/data.service";

import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { ProductCategoryComponent } from './Admin/product-category/product-category.component';
import { ShowProductCategoryComponent } from './Admin/product-category/show-product-category/show-product-category.component';
import { AddEditProductCategoryComponent } from './Admin/product-category/add-edit-product-category/add-edit-product-category.component';
import { LookupmasterComponent } from './Admin/lookupmaster/lookupmaster.component';
import { ShowLookupComponent } from './Admin/lookupmaster/show-lookup/show-lookup.component';
import { AddEditLookupComponent } from './Admin/lookupmaster/add-edit-lookup/add-edit-lookup.component';
import { LookupvalueComponent } from './Admin/lookupvalue/lookupvalue.component';
import { ShowDetailsComponent } from './Admin/lookupvalue/show-details/show-details.component';
import { AddEditDetailsComponent } from './Admin/lookupvalue/add-edit-details/add-edit-details.component';
import { ProductMasterComponent } from './Admin/product-master/product-master.component';
import { ShowProductComponent } from './Admin/product-master/show-product/show-product.component';
import { AddEditProductComponent } from './Admin/product-master/add-edit-product/add-edit-product.component';
import { BlogmasterComponent } from './Admin/blogmaster/blogmaster.component';
import { ShowBlogComponent } from './Admin/blogmaster/show-blog/show-blog.component';
import { AddEditBlogComponent } from './Admin/blogmaster/add-edit-blog/add-edit-blog.component';
import { CustomerReviewMasterComponent } from './Admin/customer-review-master/customer-review-master.component';
import { ShowCustomerReviewComponent } from './Admin/customer-review-master/show-customer-review/show-customer-review.component';
import { AddEditCustomerReviewComponent } from './Admin/customer-review-master/add-edit-customer-review/add-edit-customer-review.component';
import { ProductSubcategoryMasterComponent } from './Admin/product-subcategory-master/product-subcategory-master.component';
import { ShowSubcategoryComponent } from './Admin/product-subcategory-master/show-subcategory/show-subcategory.component';
import { AddEditSubcategoryComponent } from './Admin/product-subcategory-master/add-edit-subcategory/add-edit-subcategory.component';
import { NotificationMasterComponent } from './Admin/notification-master/notification-master.component';
import { ShowNotificationComponent } from './Admin/notification-master/show-notification/show-notification.component';
import { AddEditNotificationComponent } from './Admin/notification-master/add-edit-notification/add-edit-notification.component';
import { FaqMasterComponent } from './Admin/faq-master/faq-master.component';
import { ShowFaqComponent } from './Admin/faq-master/show-faq/show-faq.component';
import { AddEditFaqComponent } from './Admin/faq-master/add-edit-faq/add-edit-faq.component';
import { SidebarComponent } from './SharePage/sidebar/sidebar.component';
import { CustmizeDesignComponent } from './Pages/custmize-design/custmize-design.component';
import { AuthGuard } from './Auth.guard';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NavbarComponent,
    FooterComponent,
    TestimonialComponent,
    ProductDetailsComponent,
    LoginComponent,
    ProductCategoryComponent,
    ShowProductCategoryComponent,
    AddEditProductCategoryComponent,
    LookupmasterComponent,
    ShowLookupComponent,
    AddEditLookupComponent,
    LookupvalueComponent,
    ShowDetailsComponent,
    AddEditDetailsComponent,
    ProductMasterComponent,
    ShowProductComponent,
    AddEditProductComponent,
    ProductsComponent,
    UniquePipe,
    CategoryComponent,
    BlogComponent,
    BlogContentComponent,
    BlogmasterComponent,
    ShowBlogComponent,
    AddEditBlogComponent,
    CustomerReviewMasterComponent,
    ShowCustomerReviewComponent,
    AddEditCustomerReviewComponent,
    ProductSubcategoryMasterComponent,
    ShowSubcategoryComponent,
    AddEditSubcategoryComponent,
    NotificationMasterComponent,
    ShowNotificationComponent,
    AddEditNotificationComponent,
    SearchresultComponent,
    FaqComponent,
    SubcategoryComponent,
    FaqMasterComponent,
    ShowFaqComponent,
    AddEditFaqComponent,
    SidebarComponent,
    CustmizeDesignComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7181"],
        disallowedRoutes: []
      }
    }),
    ReactiveFormsModule
  ],
  providers: [SharedService, DataService,AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }

export interface AuthenticatedResponse { 
  token:string;
}

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}
