import { Component } from '@angular/core';
// import {GetApiService} from './Services/Api/get-api.service';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from './spinner-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vastra';
  users:any;

  constructor(public spinnerService: SpinnerService,private http:HttpClient)
  {
    
  }
  ngOnInit(){
    

  }
  onActivate() {
    // window.scroll(0,0);
 
    window.scroll({ 
            top: 0, 
            left:0, 
            behavior: 'smooth' 
     });
}
}
