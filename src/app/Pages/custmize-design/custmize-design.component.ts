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
  @Input() image:any;
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

  imageSrc = '';
  messageText = '';

  constructor(private userService: UserService, private param: ActivatedRoute ){ }
  ngOnInit(): void {
    this.categoryName = this.param.snapshot.paramMap.get('categoryName');
    this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
  }
  

  onClickFrontPhoto() {
  this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
  this.sideimage = true;
  this.backimage = true;
  this.frontimage = false;
}

  onClickSidetPhoto() {
  this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
  this.sideimage = false;
  this.backimage = true;
  this.frontimage = true;
  }

  onClickBackPhoto() {
  this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
  this.sideimage = true;
  this.backimage = false;
  this.frontimage = true;
}
}