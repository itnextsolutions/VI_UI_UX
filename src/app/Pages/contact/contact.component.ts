
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/Services/Api/User/user.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  
  // formData = {
  //   name: '',
  //   email: '',
  //   subject: '',
  //   message: ''
  // };

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient,private userService: UserService) { }

  // onSubmit(userForm: NgForm) {
  //   debugger
  //   this.userService.sendContactUsEmail(this.formData).subscribe(res =>{
  //     Swal.fire(res.toString()),
  //     userForm.resetForm();
  //   })

  // }  

  get f(){
    return this.form.controls;
  }
  
  submit()
  {
  debugger
    this.userService.sendContactUsEmail(this.form).subscribe(res =>{
       Swal.fire(res.toString()),
    console.log(this.form.value);
    })
  }

  }

  

  



