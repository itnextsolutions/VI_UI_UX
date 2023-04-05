import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import { Router } from '@angular/router'; 
import {AbstractControl,UntypedFormBuilder,UntypedFormGroup,Validators,FormControl} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticatedResponse } from 'src/app/app.module';

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
               private formBuilder: UntypedFormBuilder) { }

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
  
  // ngOnInit(): void {
  //   this.loginForm = this.formBuilder.group({
  //     email: ["", [Validators.email, Validators.required]],
  //     password: [
  //       "",
  //       [
  //         Validators.required
  //       ]
  //     ]
  //   });
  // }

  get formControl() {
    return this.loginForm.controls;
  }

  invalidLogin:boolean=true;

  // CheckLogin(){
  //   debugger
  //   this.submitted = true;
  //   if (this.loginForm.valid){
  //   var val = {
  //     username:this.username,
  //     password:this.password,
    
  //   };
  //   this.service.Login(val).subscribe({
  //     next: (response: AuthenticatedResponse) => {
  //       const token = response.token;
  //       localStorage.setItem("jwt", token); 
  //       this.invalidLogin = false; 
  //       this.router.navigate(["admin/product-category"]);
  //     },
  //     error: (err: HttpErrorResponse) => this.invalidLogin = true
      
  //   })
  // }

   
  CheckLogin(){
    debugger
    this.submitted = true;
    if (this.loginForm.valid){
    var val = {
      username:this.username,
      password:this.password,
    
    };
      this.service.Login(val).subscribe(res =>{
        if(res == "Success"){
          localStorage.setItem('jwt','true');
          this.router.navigate(['admin/product-category']);    
        }
        else
        {
          
          this.router.navigate(['admin/Login']);  
          this.invalid_msg=res.toString();
          //alert(res.toString());
        }
      })
    }

  }

  // onLogin(): void {
  //   // console.log(this.loginForm.value);
  //   this.submitted = true;
  //   if (this.loginForm.valid) {
  //     console.log(this.loginForm.value);
  //     localStorage.setItem("user-Data", JSON.stringify(this.loginForm.value));
  //     this.router.navigate(["/"]);
  //   }
  // }

  
}
