import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/Api/User/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public userForm = new UntypedFormGroup({
  });

public submitted = false;

  @Input() Contact:any;
  email: string ="";
  message: string =""
	msg = "";

  constructor(private userService:UserService,private formBuilder:UntypedFormBuilder) { }

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ["", [Validators.required,Validators.email,Validators.pattern(this.emailPattern)]],
      message: ["", [Validators.required,Validators.minLength(3)]]
    });
    
    // this.email=this.Contact.email;
    // this.message=this.Contact.message;
  }

  get formControl() {
    return this.userForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid){
    var val = {
      email:this.userForm.value.email,
      message:this.userForm.value.message

    };
    this.userService.sendContactUsEmail(val).subscribe(res =>{
      Swal.fire(res.toString()).then(function() {
        location.reload();
      });
    })
  }  
}

public findInvalidControls() {
  const invalid = [];
  const controls = this.userForm.controls;
  for (const name in controls) {
      if (controls[name].invalid) {
          invalid.push(name);
      }
  }
  return invalid;
}
}
