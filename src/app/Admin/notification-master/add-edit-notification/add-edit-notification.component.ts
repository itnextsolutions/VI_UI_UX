import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from "src/app/Services/shared.service";
import {AbstractControl,UntypedFormBuilder,UntypedFormGroup,Validators,FormControl} from '@angular/forms';


@Component({
  selector: 'add-edit-notification',
  templateUrl: './add-edit-notification.component.html',
  styleUrls: ['./add-edit-notification.component.css']
})
export class AddEditNotificationComponent implements OnInit {
  form = new UntypedFormGroup({
  });

  public NotificationForm = new UntypedFormGroup({
  });
  public submitted = false;

  
  @Input() notification:any;
  NotificationId:string = "";
  NotificationTitle: string ="";
  FromDate:string ="";
  ToDate:string ="";
  ButtonText: string="";
  ButtonUrl: string="";

  url: any; 
	msg = "";

  constructor(private service: SharedService, private formBuilder: UntypedFormBuilder) { }

  
  ngOnInit(): void {
    
    this.NotificationForm = this.formBuilder.group({
      NotificationTitle: ["", [Validators.required]],
      FromDate: ["",[ Validators.required]],
      ToDate: ["",[ Validators.required]],
      ButtonText: ["",[ Validators.required]],
      ButtonUrl: ["",[ Validators.required]],
    });

    this.NotificationId = this.notification.NotificationId;
    this.NotificationTitle=this.notification.NotificationTitle;
    this.FromDate=this.notification.FromDate;
    this.ToDate=this.notification.ToDate;
    this.ButtonText=this.notification.ButtonText;
    this.ButtonUrl=this.notification.ButtonUrl;
  }
  get formControl() {
    return this.NotificationForm.controls;
  }


  addNotification(){
    this.submitted = true;
    if (this.NotificationForm.valid){
      
    var val = {
    
      NotificationId:this.NotificationId,
      NotificationTitle:this.NotificationTitle,
      FromDate:this.FromDate,
      ToDate:this.ToDate,
      ButtonText:this.ButtonText,
      ButtonUrl:this.ButtonUrl
    };
      this.service.addNotification(val).subscribe(res =>{
        alert(res.toString());
      })
    }
  }

  updateNotification(){
    this.submitted = true;
    if (this.NotificationForm.valid){
    var val = {
      NotificationId:this.NotificationId,
      NotificationTitle:this.NotificationTitle,
      FromDate:this.FromDate,
      ToDate:this.ToDate,
      ButtonText:this.ButtonText,
      ButtonUrl:this.ButtonUrl
    };
      this.service.updateNotification(val).subscribe(res =>{
        alert(res.toString());
    })
  }
  }
}
