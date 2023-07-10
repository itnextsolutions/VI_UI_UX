import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { $$ } from 'protractor';
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
  @Input() image1:any;
  @Input() bgColor:any;
  @Input() men_svg_path:any;
  @Input() women_svgpath:any;
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
  canvaswidth :number=0;
  canvasheight :number=0;
  public getscreenwidth: any;

  constructor(private userService: UserService, private param: ActivatedRoute ){ }
  ngOnInit(): void {
    // this.getscreenwidth = window.innerWidth;
    this.getCanvasSize();
    // if(this.men_svg_path!=null&& this.men_svg_path!=undefined){
    // this.men_svg_path=this.men_svg_path;
    // }
    this.categoryName = this.param.snapshot.paramMap.get('categoryName');
    this.productcategoryfolder = this.categoryName.replace(/\s+/g, '-').toLowerCase();
  }
  
  @HostListener('window:resize', ['$event'])

  
  getCanvasSize() {
    this.getscreenwidth = window.innerWidth;
    // if (this.getscreenwidth >= 1280) 
    if (this.getscreenwidth >= 1024) 
    {
      this.canvaswidth = 467; this.canvasheight = 571; 
    }
    else if (this.getscreenwidth >= 320 && this.getscreenwidth <= 374) 
    {
      this.canvaswidth = 247; this.canvasheight = 303; 
    }
    else if (this.getscreenwidth >= 375 && this.getscreenwidth <= 425) 
    {
      this.canvaswidth = 327; this.canvasheight = 400; 
    }
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