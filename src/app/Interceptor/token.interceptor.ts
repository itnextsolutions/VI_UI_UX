import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../Services/shared.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private service: SharedService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken=this.service.gettoken();
    if(myToken){
      request=request.clone(
        {
          setHeaders:{Authorization:`Bearer ${myToken}`}
        }
      )
    }
    return next.handle(request);
  }
}
