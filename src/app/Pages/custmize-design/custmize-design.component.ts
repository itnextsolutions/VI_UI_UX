import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/Api/User/user.service';

@Component({
  selector: 'app-custmize-design',
  templateUrl: './custmize-design.component.html',
  styleUrls: ['./custmize-design.component.css']
})
export class CustmizeDesignComponent implements OnInit {
  @Input() Product: any;
  @Input() id:number=0; 
  frontimage=false;
  sideimage = true;
  backimage = true;

  modalTitle: any;
  activateCustmizeDesign: boolean = false;
  CustmizeDesign: any;

  frontImage: any = "";
  backImage: any = "";
  sideImage: any = "";
  catName: any = "";
  image:any="";

  imageSrc = '';
  messageText = '';
  imageButtons = [ 
  {src:'../assets/img/Shirts/pro-1-1.jpeg', name: 'Front'}, 
  {src:'../assets/img/Shirts/pro-1-3.jpeg', name: 'Back'}, 
  {src:'../assets/img/Shirts/pro-1-2.jpeg', name: 'Side'}]

 



  constructor(private userService: UserService) { }
  ngOnInit(): void {
    // this.imageSrc = this.frontImage;
  }
  // onClick(imageNameObject: any) {
  //   this.imageSrc = imageNameObject.src;
    
  //   this.messageText = imageNameObject.name;
  // }

  onClickFrontPhoto() {
  
    // this.userService.getProductById(this.productId).subscribe(data => {
    //   this.product = data;
    // });

  this.sideimage = true;
  this.backimage = true;
  this.frontimage = false;
}

  onClickSidetPhoto() {
    
    // this.userService.getProductById(this.productId).subscribe(data => {
    //   this.product = data;
    // });

  this.sideimage = false;
  this.backimage = true;
  this.frontimage = true;
  }

  onClickBackPhoto() {
  
    // this.userService.getProductById(this.productId).subscribe(data => {
    //   this.product = data;
    // });

  this.sideimage = true;
  this.backimage = false;
  this.frontimage = true;
}
}