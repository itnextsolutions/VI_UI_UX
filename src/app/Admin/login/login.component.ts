import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import { Router } from '@angular/router'; 
import {AbstractControl,UntypedFormBuilder,UntypedFormGroup,Validators,FormControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticatedResponse } from 'src/app/app.module';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 

export class LoginComponent implements OnInit {
  form = new UntypedFormGroup({
  });

  public loginForm = new UntypedFormGroup({
  });
  public submitted = false;

  @Input() login:any;
  username: string = "";
  password: string ="";
  invalid_msg : string ="";
	msg = "";

   constructor(private service: SharedService ,private router: Router,
               private formBuilder: UntypedFormBuilder,private jwtHelper :JwtHelperService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: [
        "",
        [
          Validators.required
        ]
      ]
    });

    this.username=this.login.username;
    this.password=this.login.password;
    this.invalid_msg="";
  }
  

  get formControl() {
    return this.loginForm.controls;
  }

  invalidLogin:boolean=true;


  CheckLogin(){
    this.submitted = true;
    if (this.loginForm.valid){
    var val = {
      username:this.username,
      password:this.password
    
    };
      this.service.Login(val).subscribe((res:any) =>{
        if(res.message == "Success"){
          // localStorage.setItem('jwt','true');
          // this.router.navigate(['admin/product-category']); 
          const token=res.token;
         
          localStorage.setItem('token',token);
          this.invalidLogin=false;
          this.router.navigate(["admin/product-category"]);   
        }
        else
        {
          
          this.router.navigate(['admin/Login']);  
          this.invalid_msg=res.toString();
          //alert(res.toString());
        }
      })
    //   this.service.Login(val).subscribe(
    //     {next:(response:AuthenticatedResponse)=>{
    //       const token=response.token;
         
    //       localStorage.setItem('token',token);
    //       this.invalidLogin=false;
    //       this.router.navigate(["admin/product-category"]);
    //     },
    //   error:(err:HttpErrorResponse)=>this.invalidLogin=true
    // })
    }

  }


}

