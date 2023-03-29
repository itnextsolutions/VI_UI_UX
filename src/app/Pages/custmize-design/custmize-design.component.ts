import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custmize-design',
  templateUrl: './custmize-design.component.html',
  styleUrls: ['./custmize-design.component.css']
})
export class CustmizeDesignComponent implements OnInit {

  modalTitle:any;
  activateCustmizeDesign:boolean = false;
  CustmizeDesign:any;

  imageSrc = '';
  messageText = '';
  imageButtons = [ 
  {src:'../assets/img/Shirts/pro-1-1.jpeg', name: 'Front'}, 
  {src:'../assets/img/Shirts/pro-1-3.jpeg', name: 'Back'}, 
  {src:'../assets/img/Shirts/pro-1-2.jpeg', name: 'Side'},]


  
  constructor() { }
  ngOnInit(): void {
    this.imageSrc='../assets/img/Shirts/pro-1-1.jpeg';
  }
  onClick(imageNameObject : any) {
    this.imageSrc = imageNameObject.src;
    this.messageText = imageNameObject.name;
  }

}
