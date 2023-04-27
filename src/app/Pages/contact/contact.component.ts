
import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/Services/Api/User/user.service';
import { FormBuilder, FormControl, FormGroup, NgForm, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  
  public userForm = new UntypedFormGroup({
  });
  public submitted = false;

  @Input() Contact:any;
  name: string = "";
  email: string ="";
  subject: string ="";
  message: string ="";
	msg = "";
  // formData= {
  //   name:'',
  //   email: '',
  //   subject: '',
  //   message: ''
  // };

  
  constructor(private http: HttpClient,private userService: UserService,private formBuilder:FormBuilder) {}

  
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      // Lookup_Name: ["", [Validators.required]],
      name: ["", [Validators.required,Validators.minLength(2)]],
      email: ["", [Validators.required,Validators.email,Validators.pattern(this.emailPattern)]],
      subject: ["", [Validators.required,Validators.minLength(5)]],
      message: ["", [Validators.required,Validators.minLength(3)]]
    });

    this.name=this.Contact.name;
    this.email=this.Contact.email;
    this.subject=this.Contact.subject;
    this.message=this.Contact.message;
  }

  get formControl() {
    return this.userForm.controls;
  }

  onSubmit( ) {
    this.submitted = true;
    if (this.userForm.valid){
    var val = {
      name:this.userForm.value.name,
      email:this.userForm.value.email,
      message:this.userForm.value.message,
      subject:this.userForm.value.subject,
    };
    this.userService.sendContactUsEmail(val).subscribe(res =>{
      Swal.fire(res.toString()).then(function() {
        location.reload();
      });
    })

  }  

  // get f(){
  //   return this.userForm.controls;
  // }
  
  // submit()
  // {
  // debugger
  //   this.userService.sendContactUsEmail(this.userForm).subscribe(res =>{
  //      Swal.fire(res.toString()),
  //   console.log(this.userForm.value);
  //   })
  // }

  }

  

  


}
