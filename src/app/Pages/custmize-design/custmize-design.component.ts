import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  productcategoryfolder:any;
  categoryName:any="";

  modalTitle: any;
  activateCustmizeDesign: boolean = false;
  CustmizeDesign: any;

  frontImage: any = "";
  backImage: any = "";
  sideImage: any = "";
  catName: any = "";
  image:any="";


  constructor(private userService: UserService,private param: ActivatedRoute) { }
  ngOnInit(): void {
    this.categoryName = this.param.snapshot.paramMap.get('categoryName');
    this.categoryName = this.categoryName.replace(/-/g, ' ').toUpperCase();
    this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
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

    this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
  this.sideimage = true;
  this.backimage = true;
  this.frontimage = false;
}

  onClickSidetPhoto() {
    
    // this.userService.getProductById(this.productId).subscribe(data => {
    //   this.product = data;
    // });
    this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
  this.sideimage = false;
  this.backimage = true;
  this.frontimage = true;
  }

  onClickBackPhoto() {
  
    // this.userService.getProductById(this.productId).subscribe(data => {
    //   this.product = data;
    // });
    this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
  this.sideimage = true;
  this.backimage = false;
  this.frontimage = true;
}
}