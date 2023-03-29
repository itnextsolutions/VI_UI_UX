import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/Services/Api/User/user.service";


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqList : any = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getFAQ();
  }

  getFAQ(){
    
    this.userService.getFAQ().subscribe(data =>{
      this.faqList = data;
    });
  }
}
