import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

//import { AuthService } from 'src/app/auth.service';

@Injectable({
   providedIn: 'root'
})


export class AuthGuard implements CanActivate {
   
   constructor( private router: Router) {}
   
   canActivate(
   next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): boolean | UrlTree {
      let url: string = state.url;
      
          return this.checkLogin(url);
      }
      

      checkLogin(url: string): true | UrlTree {
         debugger
         console.log("Url: " + url)
         let val = localStorage.getItem('jwt');

         if(val != null ){
            if(url == "admin/Login")
               this.router.parseUrl('/admin/product-category');
            else 
               return true;
         } 
            return this.router.parseUrl('/admin/login');
         
      }
   // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   //    const token = localStorage.getItem("jwt");
   //    if (token && !this.jwtHelper.isTokenExpired(token)){
   //      return true;
   //    }
   //    this.router.navigate(["/admin/login"]);
   //    return false;
   //  }
}
